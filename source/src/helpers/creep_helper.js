import { randomInt } from './math_helper'

export function generateParts(parts) {
    const part_list = []

    for (let key in parts) {
        for (let i = 0; i < parts[key]; i++) {
            part_list.push(key)
        }
    }
    
    return part_list
}

export function generateName(prefix = null, suffix = null) {
    const SINGLE_VOWEL_FREQUENCY = 40
    const CONSONANT_VOWEL_FREQUENCY = 3
    const TWO_CONSONANT_VOWEL_FREQUENCY = 1

    let name = ""

    const vowels = 'aeiouy'.split('')
    const consonants = 'bcdfghjklmnpqrstvwxz'.split('')
    const second_consonants = 'hlr'

    let syllables = []

    // single vowels
    for (let i = 0; i < SINGLE_VOWEL_FREQUENCY; i++) {
        syllables = syllables.concat(vowels)
    }

    // consonant-vowel
    for (const consonant of consonants) {
        for (const vowel of vowels) {
            for (let i = 0; i < CONSONANT_VOWEL_FREQUENCY; i++) {
                syllables.push(consonant + vowel)
                syllables.push(consonant + vowel)
            }
        }
    }

    // consonant-consonant-vowel
    for (const consonant of consonants) {
        for (const consonant2 of second_consonants) {
            for (const vowel of vowels) {
                for (let i = 0; i < TWO_CONSONANT_VOWEL_FREQUENCY; i++) {
                    syllables.push(consonant + consonant2 + vowel)
                }
            }
        }
    }

    const n_syllables = randomInt(2, 3)

    for (let i = 0; i < n_syllables; i++) {
        name += syllables[Math.floor(Math.random() * syllables.length)]
    }

    const capitalized_name = name.charAt(0).toUpperCase() + name.slice(1)

    return (prefix || "") + capitalized_name + (suffix || "")
}