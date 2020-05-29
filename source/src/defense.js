export default {
    run(room_name) {
        const room = Game.rooms[room_name]

        const towers = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER }})
        const damaged_creeps = room.find(FIND_MY_CREEPS).filter(c => c.hits < c.hitsMax)
        const ennemies = room.find(FIND_HOSTILE_CREEPS)

        for (const tower of towers) {
            if (ennemies.length) {
                tower.attack(ennemies[0])
            } else if (damaged_creeps.length) {
                tower.heal(damaged_creeps[0])
            }
        }
    }
}