import * as fs from 'fs';
import * as path from 'path';
import { readFileSync } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';

describe('jsonfile', () => {
  it('should throw an error when fs and graceful-fs are not available', () => {
    const originalFs = require('fs');
    const originalRequire = require;
    const originalGracefulFs = require.cache['graceful-fs'];
    delete require.cache['graceful-fs'];
    const originalFsModule = require.cache['fs'];
    delete require.cache['fs'];
    require = () => {
      throw new Error('Mocked require error');
    };
    try {
      const jsonfile = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');
      expect(() => jsonfile.readFileSync('test.json')).toThrowError('Mocked require error');
    } catch (error) {
      require = originalRequire;
      require.cache['graceful-fs'] = originalGracefulFs;
      require.cache['fs'] = originalFsModule;
      throw error;
    }
    require = originalRequire;
    require.cache['graceful-fs'] = originalGracefulFs;
    require.cache['fs'] = originalFsModule;
  });
});