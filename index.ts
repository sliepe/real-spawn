import ShellSpawn from './shell-spawn/shell-spawn.js'; // We need tsconfig-paths then, if working with path`s compiler option

const shellSpawn = ShellSpawn.getInstance();
shellSpawn.execute();