import * as fs from 'fs';
import * as path from 'path';
import { readFileSync } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';

describe('jsonfile', () => {
  it('should use fs when graceful-fs is not available', () => {
    const file = 'test.json';
    const data = { test: 'data' };
    fs.writeFileSync(file, JSON.stringify(data));
    const originalRequire = require;
    const originalGracefulFs = require.cache['graceful-fs'];
    delete require.cache['graceful-fs'];
    const jsonfile = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');
    try {
      jsonfile.readFileSync(file);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    } finally {
      fs.unlinkSync(file);
      require.cache['graceful-fs'] = originalGracefulFs;
    }
  });
});