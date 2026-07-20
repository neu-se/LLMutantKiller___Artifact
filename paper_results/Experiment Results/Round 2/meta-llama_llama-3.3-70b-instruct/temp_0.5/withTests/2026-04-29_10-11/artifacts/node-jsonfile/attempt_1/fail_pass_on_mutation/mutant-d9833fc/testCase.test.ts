import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import { readFileSync } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';

describe('jsonfile', () => {
  it('should throw an error when unable to require graceful-fs and fs', async () => {
    const originalRequire = require;
    require = () => {
      throw new Error();
    };
    try {
      await readFileSync('test.json');
      throw new Error('Expected an error to be thrown');
    } catch (err) {
      require = originalRequire;
      expect(err).toBeInstanceOf(Error);
    }
  });
});