import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

jest.mock('graceful-fs', () => {
  throw new Error('graceful-fs not available');
});

describe('jsonfile with no graceful-fs', () => {
  it('readFileSync should work without options.fs when graceful-fs unavailable', () => {
    const tmpDir = os.tmpdir();
    const tmpFile = path.join(tmpDir, `test-jsonfile-fallback-sync.json`);
    const testData = { hello: 'world' };
    fs.writeFileSync(tmpFile, JSON.stringify(testData));

    // Force re-evaluation of index.js after mock is in place
    jest.resetModules();
    jest.mock('graceful-fs', () => {
      throw new Error('graceful-fs not available');
    });

    try {
      const jsonfile = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');
      // This call uses _fs internally (no options.fs provided)
      // Original: _fs = require('fs'), so this works
      // Mutated: _fs = undefined, so this throws TypeError
      const result = jsonfile.readFileSync(tmpFile);
      expect(result).toEqual(testData);
    } finally {
      fs.unlinkSync(tmpFile);
    }
  });
});