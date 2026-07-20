import * as fs from 'fs';
import * as path from 'path';
import { readFileSync } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';

describe('jsonfile', () => {
  it('should use fs when graceful-fs is not available', () => {
    const originalFs = require('fs');
    const originalRequire = require;
    const originalGracefulFs = require.cache['graceful-fs'];
    delete require.cache['graceful-fs'];
    require = () => {
      throw new Error('Mocked require error');
    };
    try {
      const jsonfile = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');
      expect(jsonfile.readFileSync).not.toBeUndefined();
    } catch (error) {
      require = originalRequire;
      require.cache['graceful-fs'] = originalGracefulFs;
      throw error;
    }
    require = originalRequire;
    require.cache['graceful-fs'] = originalGracefulFs;
  });
});