import { Roles } from '../constants'
import { isFull, isEmpty } from '../helpers/containers'
import { generateName } from '../helpers/creep_helper'

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
            c.memory.task_target_id = findSpendTarget(c)
        }

        if (c.memory.task === Task.REFILL) {
            const source = Game.getObjectById(c.memory.source_id)
            const containers = source.pos.findInRange(FIND_MY_STRUCTURES, 1).filter(b => b.structureType === STRUCTURE_CONTAINER)
            
            if (containers.length) {
                c.moveTo(containers[0], { reusePath: 0 })
                c.withdraw(containers[0], RESOURCE_ENERGY)
            } else {
                const droppedEnergy = source.pos.findInRange(FIND_DROPPED_RESOURCES, 1).filter(r => r.resourceType === RESOURCE_ENERGY)
                
                if (droppedEnergy.length) {
                    c.moveTo(droppedEnergy[0], { reusePath: 0 })
                    c.pickup(droppedEnergy[0])
                }
            }

        } else if (c.memory.task === Task.SPEND) {
            doSpendTarget(c.room, c)
        }
    },

    create(room, sources, use_road = false) {
        const n_carry_parts = 1 //Math.min(6, Math.floor((room.energyCapacityAvailable - (n_move_parts * 50)) / 100))
        const n_move_parts = n_carry_parts
        const parts = [
            Array(n_carry_parts).fill(CARRY),
            Array(n_move_parts).fill(MOVE), 
        ].flat()

        return {
            name: generateName(null, "  ⛏"),
            parts,
            options: {
                memory: {
                    room_name: room.name,
                    role: Roles.CARRIER,
                    source_id: source.id,
                    task: Task.REFILL,
                    task_target_id: null,
                }
            }
        }
    }
}

function defineSpendTarget(c) {
    const room = Game.rooms[c.memory.room_name]

    const storage = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_STORAGE } })

    // if (room.controller.ticksToDowngrade < 750) {
    //     return room.controller.id

    // } else {
    //     const spawns = room.find(FIND_MY_SPAWNS)
    //         .filter(spawn => !isFull(spawn))
        
    //     const construction_sites = room.find(FIND_CONSTRUCTION_SITES).sort((a, b) => {
    //         return (a.progress / a.progressTotal) - (b.progress / b.progressTotal)
    //     })
        
    //     const towers = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER }})
    //         .filter(tower => !isFull(tower))
        
    //     const extensions = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_EXTENSION }})
    //         .filter(extension => isNotFull(extension))

    //     if (spawns.length) {
    //         c.memory.task_target = spawns[0].id
    //     } else if (towers.length) {
    //         c.memory.task_target = towers[0].id
    //     } else if (extensions.length) {
    //         c.memory.task_target = extensions[0].id //c.pos.findClosestByPath(extensions).id
    //     } else if (construction_sites.length) {
    //         c.memory.task_target = construction_sites[0].id
    //     } else {
    //         c.memory.task_target = c.room.controller.id 
    //     }

    // }
}

function doSpendTarget(c) {
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