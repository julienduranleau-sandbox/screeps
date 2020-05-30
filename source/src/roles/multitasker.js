import { isFull, isEmpty, isNotFull, isNotEmpty } from '../helpers/containers'
import { findHarvesterParts } from '../helpers/findHarvesterParts'
import nameGenerator from '../helpers/nameGenerator'
import { Roles } from '../constants'

const TASK = {
    REFILL: "refill",
    SPEND: "spend",
}

export default {
    run(c) {
        if (isEmpty(c) && c.memory.task !== TASK.REFILL) {
            c.memory.task = TASK.REFILL
            c.memory.task_target = c.room.find(FIND_SOURCES_ACTIVE).sort((a,b) => {
                return 0.5 - Math.random()
            })[0].id
        }

        const need_new_target = c.memory.task_target === null || Game.getObjectById(c.memory.task_target) === null

        if (isFull(c) || need_new_target) {
            defineSpendTarget(c.room, c)
        }

        if (c.memory.task === TASK.SPEND) {
            doSpendTarget(c.room, c)

        } else if (c.memory.task === TASK.REFILL) {
            doRefillTarget(c.room, c)
        }
    },

    create(room, limited_parts = false) {
        const parts = (limited_parts)
            ? findHarvesterParts(27, Math.max(300, room.energyAvailable), false).parts
            : findHarvesterParts(27, room.energyCapacityAvailable, false).parts

        const name = nameGenerator.generate(null, "   ✦")
        const options = {
            memory: {
                role: Roles.MULTITASKER,
                task: TASK.REFILL,
                task_target: null,
            }
        }

        return { name, parts, options }
    }

}

function defineSpendTarget(room, c) {
    c.memory.task = TASK.SPEND

    if (room.controller.ticksToDowngrade < 750) {
        c.memory.task_target = c.room.controller.id
        
    } else {
        const spawn = Object.values(Game.spawns)[0]
        
        const sites = room.find(FIND_CONSTRUCTION_SITES).sort((a, b) => {
            (a.progress / a.progressTotal) - (b.progress / b.progressTotal)
        })
        
        const towers = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER }})
            .filter(tower => !isFull(tower))
        
        const extensions = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_EXTENSION }})
            .filter(extension => isNotFull(extension))

        if (! isFull(spawn)) {
            c.memory.task_target = spawn.id
        } else if (towers.length) {
            c.memory.task_target = c.pos.findClosestByRange(towers).id
        } else if (extensions.length) {
            c.memory.task_target = extensions[0].id//c.pos.findClosestByPath(extensions).id
        } else if (sites.length) {
            c.memory.task_target = sites[0].id
        } else {
            c.memory.task_target = c.room.controller.id 
        }
    }
}

function doSpendTarget(room, c) {
    const target = Game.getObjectById(c.memory.task_target)

    c.moveTo(target)
                
    // controller
    if (target.structureType === STRUCTURE_CONTROLLER) {
        c.upgradeController(target)

    // Construction site
    } else if (target.progress !== undefined) {
        c.build(target)

    // Refillable structure
    } else if ([STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_TOWER].includes(target.structureType)) {
        c.transfer(target, RESOURCE_ENERGY)
        if (isFull(target)) {
            c.memory.task_target = null
        }
    }
}

function doRefillTarget(room, c) {
    const target = Game.getObjectById(c.memory.task_target)

    c.moveTo(target)
    c.harvest(target)
}