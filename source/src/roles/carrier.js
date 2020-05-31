import { Roles, OPTIMAL_MINER_WORK_PARTS } from '../constants'
import { isFull, isEmpty } from '../helpers/storage_helper'
import { generateName, generateParts } from '../helpers/creep_helper'

const Task = {
    REFILL: "refill",
    DEPOSIT: "deposit",
}

export default {
    run(c) {
        if (isEmpty(c) && c.memory.task !== Task.REFILL) {
            c.memory.task = Task.REFILL
        } else if (isFull(c) && c.memory.task !== Task.DEPOSIT) {
            c.memory.task = Task.DEPOSIT
        }

        if (c.memory.task === Task.REFILL) {
            const source = Game.getObjectById(c.memory.source_id)
            const containers = source.pos.findInRange(FIND_MY_STRUCTURES, 1).filter(b => b.structureType === STRUCTURE_CONTAINER)
            
            if (containers.length) {
                if (c.withdraw(containers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    c.moveTo(containers[0], { reusePath: 0 })
                }
            } else {
                const droppedEnergy = source.pos.findInRange(FIND_DROPPED_RESOURCES, 1).filter(r => r.resourceType === RESOURCE_ENERGY)
                
                if (droppedEnergy.length) {
                    c.moveTo(droppedEnergy[0], { reusePath: 0 })
                    c.pickup(droppedEnergy[0])
                }
            }

        } else {
            const storage = Game.getObjectById(c.memory.storage_id)
            c.moveTo(storage, { reusePath: 0 })
            c.transfer(storage, RESOURCE_ENERGY)
        }
    },

    create(room, source, use_road = false) {
        const storage = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_STORAGE } })[0]
        const n_carry_parts = getCarryPartsRequired(room, storage, source)
        const parts = generateParts({
            [CARRY]: n_carry_parts,
            [MOVE]: n_carry_parts
        })

        return {
            name: generateName(null, "  ☒"),
            parts,
            options: {
                memory: {
                    room_name: room.name,
                    role: Roles.CARRIER,
                    source_id: source.id,
                    task: Task.REFILL,
                    storage_id: storage.id
                }
            }
        }
    }
}

function getCarryPartsRequired(room, storage, source) {
    const distance = room.findPath(storage.pos, source.pos, { ignoreCreeps: true }).length
    const round_trip_duration = distance * 2 + 2
    const quantity_mined_for_duration = round_trip_duration * (OPTIMAL_MINER_WORK_PARTS * 2)
    const optimal_carry_parts = Math.ceil(quantity_mined_for_duration / 50)
    return Math.min(optimal_carry_parts, Math.floor(room.energyCapacityAvailable / 50 / 2))
}