export const isFull = c => c.store[RESOURCE_ENERGY] === c.store.getCapacity(RESOURCE_ENERGY)
export const isNotFull = c => c.store[RESOURCE_ENERGY] !== c.store.getCapacity(RESOURCE_ENERGY)
export const isEmpty = c => c.store.getFreeCapacity(RESOURCE_ENERGY) === c.store.getCapacity(RESOURCE_ENERGY)
export const isNotEmpty = c => c.store.getFreeCapacity(RESOURCE_ENERGY) !== 0