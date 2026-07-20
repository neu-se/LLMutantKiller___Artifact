import { Dirty } from '../../../../../lib/dirty/dirty.js';
import { rimraf } from 'rimraf';
import { promises as fs } from 'fs';

describe('Dirty', () => {
  it('should close the db file streams when the queue is empty', async () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    await new Promise((resolve) => {
      dirty.on('load', () => resolve());
    });
    dirty.set('key', 'value');
    await new Promise((resolve) => {
      dirty.on('drain', () => resolve());
    });
    dirty.close();
    await new Promise((resolve) => {
      dirty.on('write_close', () => resolve());
    });
    await fs.access(dbPath).catch(() => {
      throw new Error('Expected the db file to be closed');
    });
    rimraf.sync(dbPath);
  });
});