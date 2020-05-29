const MAX_CREEPS = 15
const creeps = Object.values(Game.creeps)

const isFull = c => c.store[RESOURCE_ENERGY] == c.store.getCapacity()
const isEmpty = c => c.store.getFreeCapacity() == c.store.getCapacity()

if (creeps.length < MAX_CREEPS) {
    Object.values(Game.spawns)[0].spawnCreep([WORK,MOVE,CARRY,MOVE], "standby_" + Math.floor(Math.random() * 1000))
}

for (const c of creeps) {
    if (isEmpty(c)) c.memory.deposit = false
    
    if (c.memory.deposit || isFull(c)) {
        const ctrl = c.room.controller
        c.memory.deposit = true
        c.moveTo(ctrl)
        c.upgradeController(ctrl)
    } else {
        const s = Game.getObjectById("eff307740862fd8")
        c.memory.deposit = false
        c.moveTo(s)
        c.harvest(s)
    }
}
