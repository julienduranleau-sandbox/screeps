import { Roles } from './constants'
import miner from './roles/miner'
import multitasker from './roles/multitasker'

export default {
    run(room_name) {
        const room = Game.rooms[room_name]

        const creeps = Object.values(Game.creeps) //.filter(c => c.memory.room_name === room_name)
        const sources = room.find(FIND_SOURCES)
        const buildings = room.find(FIND_MY_STRUCTURES)
        
        const spawns = buildings.filter(s => s.structureType === STRUCTURE_SPAWN)

        const multitaskers_to_spawn = createMultitasker(room, creeps)
        const miners_to_spawn = createMiners(room, creeps, sources)

        const spawn_queue = [multitaskers_to_spawn, miners_to_spawn].flat(2)

        for (let i = 0; i < Math.min(spawns.length, spawn_queue.length); i++) {
            spawns[i].spawnCreep(spawn_queue[0].parts, spawn_queue[0].name, spawn_queue[0].options);
        }

        for (const c of creeps) {
            if (c.memory.role === Roles.MINER) {
                miner.run(c)
            } else if (c.memory.role === Roles.MULTITASKER) {
                multitasker.run(c)
            }
        }
    }
}

function createMiners(room, creeps, sources) {
    const miner_creeps = creeps.filter(c => c.memory.role === Roles.MINER)
    const miner_queue = []

    // for (const source of sources) {
    //     if (miner_creeps.filter(c => c.memory.source_id === source.id).length) {
    //         continue
    //     }

    //     miner_queue.push(miner.create(room, source))
    // }

    return miner_queue
}

function createMultitasker(room, creeps) {
    const multitasker_creeps = creeps.filter(c => c.memory.role === Roles.MULTITASKER)
    const multitasker_queue = []
    const limited_parts = creeps.length < 3

    for (let i = 0; i < 7 - multitasker_creeps.length; i++) {
        multitasker_queue.push(multitasker.create(room, limited_parts))
    }

    return multitasker_queue
}