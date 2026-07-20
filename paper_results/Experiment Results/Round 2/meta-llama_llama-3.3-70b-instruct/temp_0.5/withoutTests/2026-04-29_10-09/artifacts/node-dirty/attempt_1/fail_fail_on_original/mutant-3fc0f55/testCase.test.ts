import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import { rimraf } from 'rimraf';
import { promises as fs } from 'fs';

describe('Dirty', () => {
  it('should emit drain event after writing to the stream', async () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    const drainPromise = new Promise((resolve) => {
      dirty.on('drain', () => {
        resolve();
      });
    });

    dirty.set('key', 'value');
    await drainPromise;

    await fs.unlink(dbPath);
    rimraf.sync(dbPath);
  });
});