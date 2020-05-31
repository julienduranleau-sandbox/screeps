import { Roles, DOWNGRADE_THRESHOLD } from '../constants'
import { isFull, isEmpty, isNotFull } from '../helpers/storage_helper'
import { generateName, generateParts } from '../helpers/creep_helper'

const Task = {
    REFILL: "refill",
    SPEND: "spend",
}

export default {
    run(c) {
        if (isEmpty(c) && c.memory.task !== Task.REFILL) {
            c.memory.task = Task.REFILL
            c.memory.task_target_id = null
        } else if (isFull(c) && c.memory.task !== Task.SPEND) {
            c.memory.task = Task.SPEND
            c.memory.task_target_id = findTarget(c).id
        }

        if (c.memory.task === Task.REFILL) {
            const storage = Game.getObjectById(c.memory.storage_id)
            if (c.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                c.moveTo(storage, { reusePath: 0 })
            }
            
        } else if (c.memory.task === Task.SPEND) {
            let target = Game.getObjectById(c.memory.task_target_id)

            if (target === null || (target.store !== undefined && isFull(target))) {
                target = findTarget(c)                
                c.memory.task_target_id = target.id
            }

            doSpendTarget(c, target)
        }
    },

    create(room, limited_parts = false, use_road = false) {
        const storage = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_STORAGE } })[0]
        const n_carry_parts = (limited_parts)
            ? 2
            : Math.ceil(room.energyCapacityAvailable / 4 / 50)
        const n_work_parts = Math.max(1, Math.floor(n_carry_parts / 2))
        const parts = generateParts({
            [WORK]: n_work_parts,
            [CARRY]: n_carry_parts,
            [MOVE]: n_work_parts + n_carry_parts,
        })

        return {
            name: generateName(null, "  🛠"),
            parts,
            options: {
                memory: {
                    room_name: room.name,
                    role: Roles.SPENDER,
                    storage_id: storage.id,
                    task: Task.REFILL,
                    task_target_id: null,
                }
            }
        }
    }
}

function findTarget(c) {
    // console.log("find target")
    const room = Game.rooms[c.memory.room_name]

    if (room.controller.ticksToDowngrade < DOWNGRADE_THRESHOLD) {
        return room.controller
    }

    const spawns = room.find(FIND_MY_SPAWNS).filter(spawn => !isFull(spawn))

    const construction_sites = room.find(FIND_CONSTRUCTION_SITES).sort((a, b) => {
        return (b.progress / b.progressTotal) - (a.progress / a.progressTotal)
    })
    
    const towers = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER }})
        .filter(tower => !isFull(tower))
    
    const extensions = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_EXTENSION }})
        .filter(extension => isNotFull(extension))
    
    if (spawns.length) return spawns[0]
    if (towers.length) return towers[0]
    if (extensions.length) return extensions[0] //c.pos.findClosestByPath(extensions).id
    if (construction_sites.length) return construction_sites[0]
    return c.room.controller
}

function doSpendTarget(c, target) {
    
    // controller
    if (target.structureType === STRUCTURE_CONTROLLER) {
        if (c.upgradeController(target) === ERR_NOT_IN_RANGE) {
            c.moveTo(target, { reusePath: 0 })
        }
        
        // Construction site
    } else if (target.progress !== undefined) {
        if (c.build(target) === ERR_NOT_IN_RANGE) {
            c.moveTo(target, { reusePath: 0 })
        }
        
        // Refillable structure
    } else if (target.store !== undefined) {
        if (c.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            c.moveTo(target, { reusePath: 0 })
        }
    }
}