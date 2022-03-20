import { Server } from '../../../build/data.js';
import { tellrawStaff, tellrawServer, queryTopSolid } from '../../../library/types/others.js';
import { world, Location } from 'mojang-minecraft';
const overworld = world.getDimension('overworld');
const registerInformation = {
    cancelMessage: true,
    name: 'spawn',
    description: 'tps you to spawn',
    usage: '[ spawn ]',
    example: [
        'spawn'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    try {


        const { sender } = chatmsg;
        const name = sender.getName();
        console.warn(sender.queryTopSolid());
        if (sender.scoreTest('commands') === 0) {
            return sender.tellraw(`Sorry, commands are disabled`);
        } else if (sender.scoreTest('commands') === 1) {

            if (args[0]) {
                sender.tellraw(`etc`);
            }
            else {
                if (sender.scoreTest('worldcustom') === 1) {
                    sender.teleport(new Location(sender.scoreTest('Worldx'), sender.scoreTest('Worldy'), sender.scoreTest('Worldz')), overworld, ...sender.rotation(true));
                    sender.tellraw(`${name} Has tped to spawn ${sender.scoreTest('Worldx')} ${sender.scoreTest('Worldy')} ${sender.scoreTest('Worldz')}`);
                    tellrawStaff(`${name} warped to spawn`);
                    sender.runCommand(`function scripts/run.js`);
                }
                else {
                    sender.teleport(new Location(0, sender.queryTopSolid() + 1, 0), overworld, ...sender.rotation(true));
                    // sender.runCommand(`effect @s slow_falling 20 1 `);
                    tellrawServer(`${name} tped to spawn`);
                    sender.runCommand(`function scripts/run.js`);
                }
            }
        } else {
            return sender.tellraw(`Error, command not found`);
        }
    } catch (error) {
        console.warn(error, error.stack);
    }
});
