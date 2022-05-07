#!/usr/bin/env node
const camelCase = require('lodash.camelcase');

const commands = require('../src/commands.js');

console.log("declare class Client {")
console.log("  constructor(url: string);")
Object.entries(commands)
    .forEach(
        ([name, {arguments = []}]) => {
            const fnCall = camelCase(name)
            const args = arguments.map(x => `${x}: string`).join(', ')
            console.log(`  ${fnCall}(${args}): Promise<any>;`)
        }
    )
console.log("}")
