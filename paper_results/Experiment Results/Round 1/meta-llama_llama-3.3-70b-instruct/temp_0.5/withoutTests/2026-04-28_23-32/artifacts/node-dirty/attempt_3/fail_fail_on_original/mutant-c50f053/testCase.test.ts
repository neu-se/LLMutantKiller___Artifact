import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should emit an error event when a write fails and there are no callbacks', async () => {
    const tempDir = path.join(__dirname, 'temp');
    fs.mkdirSync(tempDir);
    const dirty = new Dirty(path.join(tempDir, 'test.db'));

    let errorEmitted = false;
    dirty.on('error', (err) => {
      errorEmitted = true;
      expect(err).toBeInstanceOf(Error);
    });

    dirty.set('key', 'value', () => {
      throw new Error('Write error');
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        expect(errorEmitted).toBe(true);
        resolve();
      }, 100);
    });

    fs.rmdirSync(tempDir, { recursive: true });
  });
});