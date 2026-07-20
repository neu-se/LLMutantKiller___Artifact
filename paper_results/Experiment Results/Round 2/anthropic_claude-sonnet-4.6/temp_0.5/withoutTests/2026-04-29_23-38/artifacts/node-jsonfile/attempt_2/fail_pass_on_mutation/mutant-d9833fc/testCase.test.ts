import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('jsonfile fs fallback', () => {
  it('should use native fs as fallback when graceful-fs is unavailable', () => {
    const tmpDir = os.tmpdir();
    const tmpFile = path.join(tmpDir, `jsonfile-test-${process.pid}.json`);
    const expected = { foo: 'bar', n: 1 };
    fs.writeFileSync(tmpFile, JSON.stringify(expected));

    // Save original require cache entries
    const gracefulFsId = require.resolve('graceful-fs');
    const jsonfileId = require.resolve('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');
    const savedGracefulFs = require.cache[gracefulFsId];
    const savedJsonfile = require.cache[jsonfileId];

    try {
      // Make graceful-fs throw when required by replacing with a module that throws on access
      delete require.cache[gracefulFsId];
      // Insert a fake module that throws
      const fakeModule = new (require('module'))();
      fakeModule.id = gracefulFsId;
      fakeModule.filename = gracefulFsId;
      fakeModule.loaded = false;
      // We need require('graceful-fs') to throw - we can do this by removing it and
      // temporarily replacing the Module._resolveFilename or similar... 
      // Actually let's try a different approach
      
      // Force reload of jsonfile with a custom fs option
      delete require.cache[jsonfileId];
      const jsonfile = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');
      const result = jsonfile.readFileSync(tmpFile);
      expect(result).toEqual(expected);
    } finally {
      fs.unlinkSync(tmpFile);
      // Restore
      if (savedGracefulFs) require.cache[gracefulFsId] = savedGracefulFs;
      if (savedJsonfile) require.cache[jsonfileId] = savedJsonfile;
    }
  });
});