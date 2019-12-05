#! /usr/bin/env node

import RealSpawn from './real-spawn/real-spawn.js'; // We need tsconfig-paths then, if working with path`s compiler option

const realSpawn = RealSpawn.getInstance();
realSpawn.execute();