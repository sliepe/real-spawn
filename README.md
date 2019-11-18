# Why this node module?
* I couldn't find a working node module, which simply spawns a new own shell for a process
* Tested
    * [cross-spawn](https://www.npmjs.com/package/cross-spawn), [concurrently](https://www.npmjs.com/package/concurrently), [parallelshell](https://www.npmjs.com/package/concurrently)
    * On system: Windows 7 (cmd, git bash), Node.js 12.9.1 (nvm 1.1.7)

# Comments
* /example (Example-project for **real-spawn**)
    * **example:node** and **example:bash-ls** working
    * **example:echo** (cmd, git bash) and **example:cmd-dir** (cmd) doesn`t bring up a new shell/terminal
        * Execution of these commands is maybe too fast to see a new shell/terminal? Anyone know the reason?
            * https://www.google.de/search?q=windows+echo+command+location
                * https://superuser.com/questions/1084349/where-is-the-echo-command-file-found/1084354#1084354
                    * >Echo is not a program but a command, which is part of the cmd.exe file located in your c:\windows\system32.
                        * Obviously the reason?
    * **example:run-parallel**
        * Runs **example:tsc-watch** and **example:tscCleaner-watch** in parallel by a new shell/terminal for each command