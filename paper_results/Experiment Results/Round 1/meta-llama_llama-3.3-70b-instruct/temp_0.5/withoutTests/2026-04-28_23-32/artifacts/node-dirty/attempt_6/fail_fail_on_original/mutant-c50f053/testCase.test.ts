import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should emit an error event when a write fails and there are no callbacks', async () => {
    const tempDir = path.join(__dirname, 'temp');
    fs.mkdirSync(tempDir);
    const dirty = new Dirty(path.join(tempDir, 'test.db'));

    dirty._writeStream = {
      write: () => {
        return false;
      },
    };

    let errorEmitted = false;
    dirty.on('error', () => {
      errorEmitted = true;
    });

    dirty.set('key', 'value');

    await new Promise((resolve) => {
      setTimeout(() => {
        expect(errorEmitted).toBe(true);
        resolve(true);
      }, 100);
    });

    fs.rmdirSync(tempDir, { recursive: true });
  });
});