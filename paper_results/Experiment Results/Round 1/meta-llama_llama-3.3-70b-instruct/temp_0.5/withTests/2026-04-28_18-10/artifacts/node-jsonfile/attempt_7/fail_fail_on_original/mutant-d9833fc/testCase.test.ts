import * as fs from 'fs';
import * as path from 'path';
import { readFileSync } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';

describe('jsonfile', () => {
  it('should use fs when graceful-fs is not available', () => {
    const originalRequire = require;
    const originalGracefulFs = require.cache['graceful-fs'];
    delete require.cache['graceful-fs'];
    const jsonfile = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');
    expect(jsonfile._fs).toBe(fs);
    require.cache['graceful-fs'] = originalGracefulFs;
  });
});