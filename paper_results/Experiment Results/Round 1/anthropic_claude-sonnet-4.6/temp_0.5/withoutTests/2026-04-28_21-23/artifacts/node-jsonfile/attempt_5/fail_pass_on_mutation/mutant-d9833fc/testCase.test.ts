import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

// This mock is hoisted to the top - makes graceful-fs throw when required
jest.mock('graceful-fs', () => {
  throw new Error('graceful-fs not available');
});

describe('jsonfile fallback to fs when graceful-fs unavailable', () => {
  it('should still read files correctly when graceful-fs is not available', async () => {
    const tmpDir = os.tmpdir();
    const tmpFile = path.join(tmpDir, `test-jsonfile-fallback.json`);
    const testData = { hello: 'world', num: 42 };
    fs.writeFileSync(tmpFile, JSON.stringify(testData));

    try {
      const jsonfile = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');
      const result = await jsonfile.readFile(tmpFile);
      expect(result).toEqual(testData);
    } finally {
      fs.unlinkSync(tmpFile);
    }
  });
});