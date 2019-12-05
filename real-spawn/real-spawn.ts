import CommandPath from "command-path";

export default class RealSpawn {
    execute() {
        const child_process = require('child_process');

        const processArgv = process.argv;

        // Needed spawn variables ---
        let spawnCommand = processArgv[2];

        if (typeof spawnCommand === 'undefined') {
            throw new Error('Command parameter missing!');
        }

        const spawnParameters = processArgv.slice(3, processArgv.length);
        const spawnOptions = {
            detached: true,
            shell: true
        };
        // ---

        // We want to check, spawn command is absolute, relative, local or global ---
        spawnCommand = RealSpawn.prepareCommandName(spawnCommand);
        // ---

        // Spawn the process in a new shell
        const childProcess = child_process.spawn(spawnCommand, spawnParameters, spawnOptions);

        // https://nodejs.org/docs/latest-v12.x/api/child_process.html#child_process_child_process_spawn_command_args_options
        /* Not on detached
        childProcess.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        childProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        }); */

        childProcess.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
        });

        // https://nodejs.org/docs/latest-v12.x/api/child_process.html#child_process_event_close
        childProcess.on('exit', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    }

    private static prepareCommandName(commandName: string) {
        if (CommandPath.isAbsolute(commandName)) {
            // Simply return
            return commandName;
        }

        if (CommandPath.isRelative(commandName)) {
            const processCwd = process.cwd();

            const path = require('path');

            // Simply prepend current working dir of the node process
            return processCwd + path.sep + commandName;
        }

        if (CommandPath.isLocal(commandName)) {
            // Get and return local command path
            const localCommandPath = CommandPath.getLocal(commandName);

            // If local path contains any whitespace
            if (CommandPath.containsWhitespace(localCommandPath)) {
                // Return with double quotes surrounded
                return CommandPath.surroundWithDoubleQuotes(localCommandPath);
            }

            return localCommandPath;
        }

        if (CommandPath.isGlobal(commandName)) {
            // Simply return
            return commandName;
        }
    }

    private static instance: RealSpawn;

    static getInstance(): RealSpawn {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new RealSpawn();

        return this.instance;
    }
}