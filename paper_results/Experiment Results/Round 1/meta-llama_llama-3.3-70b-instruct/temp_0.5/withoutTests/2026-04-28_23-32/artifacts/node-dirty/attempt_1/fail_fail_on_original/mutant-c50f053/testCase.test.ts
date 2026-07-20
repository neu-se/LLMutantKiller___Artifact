import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import path from 'path';
import { rimraf } from 'rimraf';

describe('Dirty', () => {
  it('should emit an error event when a write fails and there are no callbacks', async () => {
    const tempDir = path.join(__dirname, 'temp');
    fs.mkdirSync(tempDir);
    const dirty = new Dirty(path.join(tempDir, 'test.db'));

    dirty.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      rimraf.sync(tempDir);
    });

    dirty.set('key', 'value', (err) => {
      if (err) {
        throw err;
      }
    });

    // Simulate a write error
    const writeStream = dirty._writeStream;
    const originalWrite = writeStream.write.bind(writeStream);
    writeStream.write = () => {
      return false;
    };

    dirty.set('key', 'value', () => {});

    // Restore the original write method
    writeStream.write = originalWrite;

    await new Promise((resolve) => {
      dirty.on('error', () => {
        resolve();
      });
    });
  });
});