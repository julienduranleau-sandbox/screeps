// import { isFull, isEmpty, isNotFull, isNotEmpty } from '../helpers/containers'
// import { findHarvesterParts } from '../helpers/findHarvesterParts'
// import nameGenerator from '../helpers/nameGenerator'

// const TASK = {
//     MOVE: "move",
//     MINE: "spend",
// }

// export default {
//     run(room_name, n_creeps) {
//         const room = Game.rooms[room_name]
//         const creeps = Object.values(Game.creeps).filter(c => c.memory.role === "multitask")
        
//     },

// }

// function spawn(room, creeps, n_creeps) {
//     const parts = (creeps.length > n_creeps - 2)
//             ? findHarvesterParts(27, room.energyCapacityAvailable, false).parts
//             : findHarvesterParts(27, Math.max(300, room.energyAvailable), false).parts
//     const name = nameGenerator.generate(null, "   ✦")
//     const options = {
//         memory: {
//             role: "multitask",
//             task: TASK.REFILL,
//             task_target: null,
//         }
//     }
//     Object.values(Game.spawns)[0].spawnCreep(parts, name, options)
// }

// function doRefillTarget(room, c) {
//     const target = Game.getObjectById(c.memory.task_target)

//     c.moveTo(target)
//     c.harvest(target)
// }