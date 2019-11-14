export default class ShellSpawn {
    execute() {
        const child_process = require('child_process');

        const processArgv = process.argv;

        const spawnCommand = processArgv[2];
        const spawnParameters = processArgv.slice(3, processArgv.length);
        const spawnOptions = {
            detached: true,
            shell: true
        };

        const childProcess = child_process.spawn(spawnCommand, spawnParameters, spawnOptions);

        // https://nodejs.org/docs/latest-v12.x/api/child_process.html#child_process_child_process_spawn_command_args_options
        /* not on detached
        childProcess.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        childProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        }); */

        childProcess.on('close', (code) => {
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