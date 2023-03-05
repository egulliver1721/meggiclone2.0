import type { Config } from 'jest';

const config: Config = {
  transform: {
    '^.+\\.(ts|tsx)$': '@swc/jest',
  },
};

export default config;
