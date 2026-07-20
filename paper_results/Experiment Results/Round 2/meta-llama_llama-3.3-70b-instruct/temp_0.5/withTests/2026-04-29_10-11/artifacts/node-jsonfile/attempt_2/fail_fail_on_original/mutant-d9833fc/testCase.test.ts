import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import { readFileSync } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';

describe('jsonfile', () => {
  it('should use fs when graceful-fs fails to load', () => {
    const originalRequire = require;
    let fsModule;
    require = (module) => {
      if (module === 'graceful-fs') {
        throw new Error();
      } else if (module === 'fs') {
        fsModule = { readFileSync: () => '{ "key": "value" }' };
        return fsModule;
      }
      return originalRequire(module);
    };
    try {
      const result = readFileSync('test.json');
      expect(result).toEqual({ key: 'value' });
    } finally {
      require = originalRequire;
    }
  });
});