import { Roles } from '../constants'
import nameGenerator from '../helpers/nameGenerator'

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

    create(room, source) {
        const n_move_parts = 2
        const n_work_parts = 1 //Math.min(6, Math.floor((room.energyCapacityAvailable - (n_move_parts * 50)) / 100))
        const parts = [
            Array(n_move_parts).fill(MOVE), 
            Array(n_work_parts).fill(WORK)
        ].flat()

        return {
            name: nameGenerator.generate(null, "  ⛏"),
            parts,
            options: {
                memory: {
                    room_name: room.name,
                    role: Roles.Miner,
                    source_id: source.id,
                    arrived: false,
                }
            }
        }
    }
}