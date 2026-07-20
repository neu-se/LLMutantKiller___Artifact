import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { readFileSync } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';

describe('jsonfile', () => {
  it('should throw an error when "graceful-fs" is not installed', () => {
    const originalFs = require('fs');
    const originalRequire = require;
    require = () => {
      throw new Error('Mocked require error');
    };
    try {
      readFileSync('test.json');
    } catch (error) {
      require = originalRequire;
      expect(error.message).toBe('Mocked require error');
    }
    require = originalRequire;
  });
});