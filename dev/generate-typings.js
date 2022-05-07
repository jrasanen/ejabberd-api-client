#!/usr/bin/env node
const camelCase = require('lodash.camelcase');

const commands = require('../src/commands.js');

const resevedWords = ['with']

const checkReservedWords = (name) =>  {
    return resevedWords.includes(name)
        ? `${name}_`
        : name
}

// ¯\_(ツ)_/¯
console.log(`declare module "ejabbered-api-client" {`)
console.log("  declare class Client {")
console.log("    constructor(url: string);")
Object.entries(commands)
    .forEach(
        ([name, {arguments = []}]) => {
            const fnCall = camelCase(name)
            const args = arguments.map(x => `${checkReservedWords(x)}: string`).join(', ')
            console.log(`    ${fnCall}(${args}): Promise<any>;`)
        }
    )
console.log("  }")
console.log("}")
