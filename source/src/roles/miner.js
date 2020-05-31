import { Roles } from '../constants'
import { generateName, generateParts } from '../helpers/creep_helper'

export default {
    run(c) {
        const source = Game.getObjectById(c.memory.source_id)
        
        if (c.memory.arrived === false) {
            const containers = source.pos.findInRange(FIND_MY_STRUCTURES, 1).filter(b => b.structureType === STRUCTURE_CONTAINER)
            
            if (containers.length) {
                if (c.pos.isEqualTo(containers[0].pos)) {
                    c.memory.arrived = true
                } else {
                    c.moveTo(containers[0].pos, { reusePath: 0 })
                }
            } else {
                if (c.pos.inRangeTo(source.pos, 1)) {
                    c.memory.arrived = true
                } else {
                    c.moveTo(source, { reusePath: 0 })
                }
            }
        }

        if (c.memory.arrived) {
            c.harvest(source)
        }
    },

    create(room, source, use_roads = false) {
        const target_move_parts = 3
        const n_work_parts = Math.min(6, Math.floor((room.energyCapacityAvailable - (target_move_parts * 50)) / 100))
        const n_move_parts = Math.min(target_move_parts, n_work_parts)
        const parts = generateParts({
            [MOVE]: n_move_parts,
            [WORK]: n_work_parts,
        })

        return {
            name: generateName(null, "  ⛏"),
            parts,
            options: {
                memory: {
                    room_name: room.name,
                    role: Roles.MINER,
                    source_id: source.id,
                    arrived: false,
                }
            }
        }
    }
}