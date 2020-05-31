import { Roles } from '../constants'
import { isFull, isEmpty, isNotFull } from '../helpers/storage_helper'
import { generateName, generateParts } from '../helpers/creep_helper'
import { limits } from '../helpers/math_helper'

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
            let target = Game.getObjectById(c.memory.task_target)

            if (target === null || target.hits === target.hitsMax) {
                target = findTarget(c)
                if (target) {
                    c.memory.task_target_id = target.id
                }
            }

            if (target) {
                if (c.repair(target) === ERR_NOT_IN_RANGE) {
                    c.moveTo(target, { reusePath: 0 })
                }
            }
            
        }
    },

    create(room, use_road = false) {
        const storage = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_STORAGE } })[0]
        const n_carry_parts = limits(Math.floor(room.controller.level / 2), 1, 2)
        const n_work_parts = 1
        const parts = generateParts({
            [WORK]: n_work_parts,
            [CARRY]: n_carry_parts,
            [MOVE]: n_work_parts + n_carry_parts,
        })

        return {
            name: generateName(null, "  🔧"),
            parts,
            options: {
                memory: {
                    room_name: room.name,
                    role: Roles.FIXER,
                    storage_id: storage.id,
                    task: Task.REFILL,
                    task_target_id: null,
                }
            }
        }
    }
}

function findTarget(c) {
    const room = Game.rooms[c.memory.room_name]
    
    const buildings = room.find(FIND_STRUCTURES)
        .filter(building => building.hits < building.hitsMax)
        .filter(building => building.hits / building.hitsMax < 0.75)
        .filter(building => building.structureType !== STRUCTURE_WALL)
        .sort((a, b) => (a.hits / a.hitsMax) - (b.hits / b.hitsMax))
    
    if (buildings.length) {
        return buildings[0]
    }

    const walls = room.find(FIND_STRUCTURES)
        .filter(building => building.structureType === STRUCTURE_WALL)
        .sort((a, b) => a.hits - b.hits)

    if (walls.length) {
        return walls[0]
    }

    return null
}