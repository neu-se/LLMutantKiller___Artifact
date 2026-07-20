import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';

describe('Dirty', () => {
  it('should not throw an error when creating a read stream with encoding', (done) => {
    const tempDir = './temp';
    fs.mkdirSync(tempDir);
    const filePath = `${tempDir}/test.txt`;
    fs.writeFileSync(filePath, 'Hello World!');
    const dirty = new Dirty(filePath);
    dirty.on('error', (err: any) => {
      throw err;
    });
    dirty.on('load', () => {
      const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
      let data = '';
      readStream.on('data', (chunk) => {
        data += chunk;
      });
      readStream.on('end', () => {
        expect(data).toBe('Hello World!');
        fs.rmdirSync(tempDir, { recursive: true });
        done();
      });
    });
  });
});