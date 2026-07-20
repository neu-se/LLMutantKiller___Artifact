import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';

describe('Dirty', () => {
  it('should throw an error when creating a read stream without encoding in the mutated code', () => {
    const tempDir = './temp';
    fs.mkdirSync(tempDir);
    const filePath = `${tempDir}/test.txt`;
    fs.writeFileSync(filePath, 'Hello World!');
    const dirty = new Dirty(filePath);
    dirty.on('error', (err: any) => {
      throw err;
    });
    dirty.on('load', () => {
      expect(() => {
        const readStream = fs.createReadStream(filePath);
        readStream.on('data', (chunk) => {
          const stringChunk = chunk.toString();
          expect(stringChunk).toBe('Hello World!');
        });
      }).not.toThrow();
      fs.rmdirSync(tempDir, { recursive: true });
    });
  });
});