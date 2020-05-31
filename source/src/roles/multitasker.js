import { isFull, isEmpty, isNotFull, isNotEmpty } from '../helpers/storage_helper'
import { generateName } from '../helpers/creep_helper'
import { Roles, DOWNGRADE_THRESHOLD } from '../constants'

const TASK = {
    REFILL: "refill",
    SPEND: "spend",
}

export default {
    run(c) {
        if (isEmpty(c) && c.memory.task !== TASK.REFILL) {
            c.memory.task = TASK.REFILL
            c.memory.task_target = c.room.find(FIND_SOURCES_ACTIVE).sort((a,b) => {
                return 0.5 - Math.random()
            })[0].id
        }

        const need_new_target = c.memory.task_target === null || Game.getObjectById(c.memory.task_target) === null

        if (isFull(c) || need_new_target) {
            defineSpendTarget(c.room, c)
        }

        if (c.memory.task === TASK.SPEND) {
            doSpendTarget(c.room, c)

        } else if (c.memory.task === TASK.REFILL) {
            doRefillTarget(c.room, c)
        }
    },

    create(room, limited_parts = false) {
        const parts = (limited_parts)
            ? findParts(27, Math.max(300, room.energyAvailable), false).parts
            : findParts(27, room.energyCapacityAvailable, false).parts

        const name = generateName(null, "   ✦")
        const options = {
            memory: {
                role: Roles.MULTITASKER,
                task: TASK.REFILL,
                task_target: null,
            }
        }

        return { name, parts, options }
    }

}

function defineSpendTarget(room, c) {
    c.memory.task = TASK.SPEND

    if (room.controller.ticksToDowngrade < DOWNGRADE_THRESHOLD) {
        c.memory.task_target = c.room.controller.id
        
    } else {
        const spawn = Object.values(Game.spawns)[0]
        
        const sites = room.find(FIND_CONSTRUCTION_SITES).sort((a, b) => {
            (a.progress / a.progressTotal) - (b.progress / b.progressTotal)
        })
        
        const towers = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER }})
            .filter(tower => !isFull(tower))
        
        const extensions = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_EXTENSION }})
            .filter(extension => isNotFull(extension))

        if (! isFull(spawn)) {
            c.memory.task_target = spawn.id
        } else if (towers.length) {
            c.memory.task_target = c.pos.findClosestByRange(towers).id
        } else if (extensions.length) {
            c.memory.task_target = extensions[0].id//c.pos.findClosestByPath(extensions).id
        } else if (sites.length) {
            c.memory.task_target = sites[0].id
        } else {
            c.memory.task_target = c.room.controller.id 
        }
    }
}

function doSpendTarget(room, c) {
    const target = Game.getObjectById(c.memory.task_target)

    c.moveTo(target, { reusePath: 0 })
                
    // controller
    if (target.structureType === STRUCTURE_CONTROLLER) {
        c.upgradeController(target)

    // Construction site
    } else if (target.progress !== undefined) {
        c.build(target)

    // Refillable structure
    } else if ([STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_TOWER].includes(target.structureType)) {
        c.transfer(target, RESOURCE_ENERGY)
        if (isFull(target)) {
            c.memory.task_target = null
        }
    }
}

function doRefillTarget(room, c) {
    const target = Game.getObjectById(c.memory.task_target)

    c.moveTo(target, { reusePath: 0 })
    c.harvest(target)
}

function findParts(distance, max_production_cost, use_road = false) {
    const lifetime = CREEP_LIFE_TIME
    const ticks_travelling = distance * 2

    let best_energy_ratio = 0
    let best_parts = null

    for (let parts_work = 1; parts_work < 25; parts_work++) {
        for (let parts_carry = 1; parts_carry < 25; parts_carry++) {
            const parts_move = (use_road)
                ? Math.ceil((parts_work + parts_carry) / 2)
                : parts_work + parts_carry
            
            if (parts_work + parts_carry + parts_move > 50) {
                break
            }

            const production_cost = parts_work * 100 + parts_carry * 50 + parts_move * 50
            
            if (production_cost > max_production_cost) {
                break
            }

            const carry_capacity = parts_carry * 50
            const ticks_refilling = carry_capacity / 2 / parts_work
            const total_gathered = (lifetime / (ticks_travelling + ticks_refilling)) * carry_capacity
            const energy_ratio = total_gathered / production_cost

            if (energy_ratio > best_energy_ratio) {
                best_energy_ratio = energy_ratio
                best_parts = {
                    work: parts_work,
                    carry: parts_carry,
                    move: parts_move
                }
            }
        }
    }

    const final_parts = [
        Array(best_parts.work).fill(WORK),
        Array(best_parts.carry).fill(CARRY),
        Array(best_parts.move).fill(MOVE),
    ].flat()

    return {
        ratio: best_energy_ratio,
        parts: final_parts,
        roads: use_road
    }
}