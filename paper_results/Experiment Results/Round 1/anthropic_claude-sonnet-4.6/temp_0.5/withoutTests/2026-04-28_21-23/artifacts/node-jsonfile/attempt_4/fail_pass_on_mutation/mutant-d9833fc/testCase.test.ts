import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('jsonfile fallback to fs when graceful-fs unavailable', () => {
  it('should still read files correctly when graceful-fs is not available', async () => {
    const tmpDir = os.tmpdir();
    const tmpFile = path.join(tmpDir, `test-jsonfile-fallback.json`);
    const testData = { hello: 'world', num: 42 };
    fs.writeFileSync(tmpFile, JSON.stringify(testData));

    jest.resetModules();

    // Find graceful-fs path and poison its cache entry
    const gracefulFsPath = require.resolve('graceful-fs');
    const indexPath = require.resolve('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');

    // Remove from cache so index.js re-evaluates
    delete require.cache[gracefulFsPath];
    delete require.cache[indexPath];

    // Insert a poisoned entry for graceful-fs that throws when accessed
    (require.cache as any)[gracefulFsPath] = {
      id: gracefulFsPath,
      filename: gracefulFsPath,
      loaded: true,
      get exports() {
        throw new Error('graceful-fs not available');
      }
    };

    try {
      const jsonfile = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');
      const result = await jsonfile.readFile(tmpFile);
      expect(result).toEqual(testData);
    } finally {
      delete require.cache[gracefulFsPath];
      delete require.cache[indexPath];
      fs.unlinkSync(tmpFile);
      jest.resetModules();
    }
  });
});