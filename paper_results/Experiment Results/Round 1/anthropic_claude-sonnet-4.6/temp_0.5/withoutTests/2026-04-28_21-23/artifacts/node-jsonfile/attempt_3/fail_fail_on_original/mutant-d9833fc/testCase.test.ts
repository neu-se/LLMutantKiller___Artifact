import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import * as Module from 'module';

describe('jsonfile fallback to fs when graceful-fs unavailable', () => {
  it('should still read files correctly when graceful-fs is not available', async () => {
    const tmpDir = os.tmpdir();
    const tmpFile = path.join(tmpDir, `test-jsonfile-fallback.json`);
    const testData = { hello: 'world', num: 42 };
    fs.writeFileSync(tmpFile, JSON.stringify(testData));

    // Clear module cache
    jest.resetModules();
    
    // Remove graceful-fs from require cache and make it unresolvable
    const originalLoad = (Module as any)._load;
    (Module as any)._load = function(request: string, ...args: any[]) {
      if (request === 'graceful-fs') {
        throw new Error('Cannot find module graceful-fs');
      }
      return originalLoad.call(this, request, ...args);
    };

    try {
      const jsonfile = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');
      const result = await jsonfile.readFile(tmpFile);
      expect(result).toEqual(testData);
    } finally {
      (Module as any)._load = originalLoad;
      fs.unlinkSync(tmpFile);
      jest.resetModules();
    }
  });
});