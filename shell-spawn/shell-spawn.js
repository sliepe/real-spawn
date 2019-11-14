"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShellSpawn = /** @class */ (function () {
    function ShellSpawn() {
    }
    ShellSpawn.prototype.execute = function () {
        var child_process = require('child_process');
        var processArgv = process.argv;
        var spawnCommand = processArgv[2];
        var spawnParameters = processArgv.slice(3, processArgv.length);
        var spawnOptions = {
            detached: true,
            shell: true
        };
        var childProcess = child_process.spawn(spawnCommand, spawnParameters, spawnOptions);
        // https://nodejs.org/docs/latest-v12.x/api/child_process.html#child_process_child_process_spawn_command_args_options
        /* not on detached
        childProcess.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        childProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        }); */
        childProcess.on('close', function (code) {
            console.log("child process exited with code " + code);
        });
    };
    ShellSpawn.getInstance = function () {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ShellSpawn();
        return this.instance;
    };
    return ShellSpawn;
}());
exports.default = ShellSpawn;
//# sourceMappingURL=shell-spawn.js.map