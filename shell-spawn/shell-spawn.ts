export default class ShellSpawn {
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

        // We want to check, if a path separator is contained ---
        const path = require('path');

        const normalizedCommandPath = path.normalize(spawnCommand);

        if (normalizedCommandPath.indexOf(path.sep) > -1) {
            // Is it an relative path?
            if (!path.isAbsolute(normalizedCommandPath)) {
                const processCwd = process.cwd();
                // Simply prepend current working dir of the node process
                spawnCommand = processCwd + path.sep + spawnCommand;
            }
        }
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

    private static instance: ShellSpawn;

    static getInstance(): ShellSpawn {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new ShellSpawn();

        return this.instance;
    }
}