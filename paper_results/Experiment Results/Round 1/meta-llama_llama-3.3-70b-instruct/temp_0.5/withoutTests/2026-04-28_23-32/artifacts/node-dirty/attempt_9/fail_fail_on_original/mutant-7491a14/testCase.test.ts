import { Dirty } from '../../../lib/dirty/dirty.js';
import * as fs from 'fs';

describe('Dirty', () => {
  it('should throw an error when creating a read stream without encoding', () => {
    const tempDir = './temp';
    fs.mkdirSync(tempDir);
    const filePath = `${tempDir}/test.txt`;
    fs.writeFileSync(filePath, 'Hello World!');
    const dirty = new Dirty(filePath);
    dirty.on('error', (err: any) => {
      throw err;
    });
    dirty.on('load', () => {
      const readStream = fs.createReadStream(filePath);
      readStream.on('data', (chunk) => {
        expect(() => chunk.toString()).toThrowError();
      });
      fs.rmdirSync(tempDir, { recursive: true });
    });
  });
});