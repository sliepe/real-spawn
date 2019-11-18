"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShellSpawn = /** @class */ (function () {
    function ShellSpawn() {
    }
    ShellSpawn.prototype.execute = function () {
        var child_process = require('child_process');
        var processArgv = process.argv;
        // Needed spawn variables ---
        var spawnCommand = processArgv[2];
        if (typeof spawnCommand === 'undefined') {
            throw new Error('Command parameter missing!');
        }
        var spawnParameters = processArgv.slice(3, processArgv.length);
        var spawnOptions = {
            detached: true,
            shell: true
        };
        // ---
        // We want to check, if a path separator is contained ---
        var path = require('path');
        var normalizedCommandPath = path.normalize(spawnCommand);
        if (normalizedCommandPath.indexOf(path.sep) > -1) {
            // Is it an relative path?
            if (!path.isAbsolute(normalizedCommandPath)) {
                var processCwd = process.cwd();
                // Simply prepend current working dir of the node process
                spawnCommand = processCwd + path.sep + spawnCommand;
            }
        }
        // ---
        // Spawn the process in a new shell
        var childProcess = child_process.spawn(spawnCommand, spawnParameters, spawnOptions);
        // https://nodejs.org/docs/latest-v12.x/api/child_process.html#child_process_child_process_spawn_command_args_options
        /* Not on detached
        childProcess.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        childProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        }); */
        childProcess.on('close', function (code) {
            console.log("child process close all stdio with code " + code);
        });
        // https://nodejs.org/docs/latest-v12.x/api/child_process.html#child_process_event_close
        childProcess.on('exit', function (code) {
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