import { Roles } from './constants'
import creep_miner from './roles/miner'
import creep_carrier from './roles/carrier'
import creep_multitasker from './roles/multitasker'
import creep_spender from './roles/spender'
import creep_fixer from './roles/fixer'

export default {
    run(room_name) {
        const room = Game.rooms[room_name]
        const creeps = Object.values(Game.creeps) //.filter(c => c.memory.room_name === room_name)
        const sources = room.find(FIND_SOURCES)
        const buildings = room.find(FIND_MY_STRUCTURES)
        const spawns = buildings.filter(s => s.structureType === STRUCTURE_SPAWN)

        // =================
        // Spawn Queue

        const queue = [
            createMultitaskers(room, creeps),
            createSpenders(room, creeps, sources), // storage only
            createMiners(room, creeps, sources), 
            createCarriers(room, creeps, sources),
            createFixers(room, creeps), // storage only
        ].flat(2)

        // =================
        // Spawn loop
        
        for (const spawn of spawns) {
            if (spawn.spawning) {
                displaySpawnProgress(spawn)
            } else if (queue.length) {
                spawn.spawnCreep(queue[0].parts, queue[0].name, queue[0].options)
                queue.shift()
            }
        }
        
        displayLeftInQueue(queue)

        // =================
        // Run loop

        for (const c of creeps) {
            switch (c.memory.role) {
                case Roles.MINER: creep_miner.run(c); break
                case Roles.MULTITASKER: creep_multitasker.run(c); break
                case Roles.CARRIER: creep_carrier.run(c); break
                case Roles.SPENDER: creep_spender.run(c); break
                case Roles.FIXER: creep_fixer.run(c); break
            }
        }
    }
}

function createMiners(room, creeps, sources) {
    const miner_creeps = creeps.filter(c => c.memory.role === Roles.MINER)
    const miner_queue = []

    for (const source of sources) {
        if (miner_creeps.filter(c => c.memory.source_id === source.id).length === 0) {
            miner_queue.push(creep_miner.create(room, source))
        }
    }

    return miner_queue
}

function createCarriers(room, creeps, sources) {
    const carrier_creeps = creeps.filter(c => c.memory.role === Roles.CARRIER)
    const carrier_queue = []

    
    for (const source of sources) {
        if (carrier_creeps.filter(c => c.memory.source_id === source.id).length === 0) {
            carrier_queue.push(creep_carrier.create(room, source))
        }
    }

    return carrier_queue
}

function createMultitaskers(room, creeps) {
    const multitasker_creeps = creeps.filter(c => c.memory.role === Roles.MULTITASKER)
    const multitasker_queue = []
    const limited_parts = creeps.length < 2
    const n_to_spawn = 4 - creeps.length

    for (let i = 0; i < n_to_spawn - multitasker_creeps.length; i++) {
        multitasker_queue.push(creep_multitasker.create(room, limited_parts))
    }

    return multitasker_queue
}

function createSpenders(room, creeps) {
    const storages = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_STORAGE } })
    if (storages.length === 0) return []

    const storage = storages[0]
    const spender_creeps = creeps.filter(c => c.memory.role === Roles.SPENDER)
    const spender_queue = []
    const limited_parts = spender_creeps.length === 0
    const n_to_spawn = Math.min(5, Math.max(2, Math.floor(storage.store[RESOURCE_ENERGY] / 5000)))

    for (let i = 0; i < n_to_spawn - spender_creeps.length; i++) {
        spender_queue.push(creep_spender.create(room, limited_parts))
    }

    return spender_queue
}

function createFixers(room, creeps) {
    const storages = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_STORAGE } })
    if (storages.length === 0) return []

    const fixer_creeps = creeps.filter(c => c.memory.role === Roles.FIXER)
    const fixer_queue = []
    const n_to_spawn = 1

    for (let i = 0; i < n_to_spawn - fixer_creeps.length; i++) {
        fixer_queue.push(creep_fixer.create(room))
    }

    return fixer_queue
}

function displayLeftInQueue(queue) {

}

function displaySpawnProgress(spawn) {

}