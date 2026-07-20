import * as fs from 'fs';
import * as path from 'path';
import { readFileSync } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';

describe('jsonfile', () => {
  it('should throw an error when fs and graceful-fs are not available', () => {
    const file = 'test.json';
    const data = { test: 'data' };
    fs.writeFileSync(file, JSON.stringify(data));
    try {
      const originalRequire = require;
      const originalGracefulFs = require.cache['graceful-fs'];
      delete require.cache['graceful-fs'];
      const originalFsModule = require.cache['fs'];
      delete require.cache['fs'];
      const jsonfile = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');
      expect(() => jsonfile.readFileSync(file)).toThrowError();
    } catch (error) {
      expect(error.message).toContain('Cannot read properties of undefined');
    } finally {
      fs.unlinkSync(file);
    }
  });
});