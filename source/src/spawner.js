import { Roles } from './constants'

export default {
    run(room_name) {
        const room = Game.rooms[room_name]

        const spawn_queue = []

        const spawns = room.find(FIND_MY_STRUCTURES)
            .filter(s => s.structureType === STRUCTURE_SPAWN)
        
        const creeps = Game.creeps.filter(c => c.memory.room_name === room_name)

        const sources = room.find(FIND_SOURCES)

        spawn_queue = spawn_queue.concat(this.createMiners(room, creeps, sources))
    },
    
    createMiners(room, creeps, sources) {
        const minerCreeps = creeps.filter(c => c.memory.role === Roles.Miner)
        const miners = []

        for (const source of sources) {
            // Source has miner
            if (miner_creeps.filter(c => c.memory.source_id === source.id).length) {
                continue
            }

            miners.push({
                name: 'Miner',
                parts: [],
                options: {
                    memory: {
                        room_name: room.name,
                        role: Roles.Miner,
                        source_id: source.id
                    }
                }
            })
        }

        return miners
    }
}