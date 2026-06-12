import { runCommand } from './commands.ts'

const command = process.argv[2]
const arg1 = process.argv[3]
const arg2 = process.argv[4]
const arg3 = process.argv[5]


runCommand(command, arg1, arg2, arg3)