import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should throw an error when creating a read stream without specifying the encoding', () => {
    const tempDir = path.join(__dirname, 'temp');
    fs.mkdirSync(tempDir);
    const filePath = path.join(tempDir, 'test.txt');
    fs.writeFileSync(filePath, 'Hello World!');
    const dirty = new Dirty(filePath);
    dirty.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      rimraf.sync(tempDir);
    });
  });
});