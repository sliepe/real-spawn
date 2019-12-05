"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var command_path_1 = require("command-path");
var RealSpawn = /** @class */ (function () {
    function RealSpawn() {
    }
    RealSpawn.prototype.execute = function () {
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
        // We want to check, spawn command is absolute, relative, local or global ---
        spawnCommand = RealSpawn.prepareCommandName(spawnCommand);
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
    RealSpawn.prepareCommandName = function (commandName) {
        if (command_path_1.default.isAbsolute(commandName)) {
            // Simply return
            return commandName;
        }
        if (command_path_1.default.isRelative(commandName)) {
            var processCwd = process.cwd();
            var path = require('path');
            // Simply prepend current working dir of the node process
            return processCwd + path.sep + commandName;
        }
        if (command_path_1.default.isLocal(commandName)) {
            // Get and return local command path
            var localCommandPath = command_path_1.default.getLocal(commandName);
            // If local path contains any whitespace
            if (command_path_1.default.containsWhitespace(localCommandPath)) {
                // Return with double quotes surrounded
                return command_path_1.default.surroundWithDoubleQuotes(localCommandPath);
            }
            return localCommandPath;
        }
        if (command_path_1.default.isGlobal(commandName)) {
            // Simply return
            return commandName;
        }
    };
    RealSpawn.getInstance = function () {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new RealSpawn();
        return this.instance;
    };
    return RealSpawn;
}());
exports.default = RealSpawn;
//# sourceMappingURL=real-spawn.js.map