import { Dirty } from '../../../lib/dirty/dirty.js';
import { promises as fs } from 'fs';

describe('Dirty', () => {
  it('should emit drain event after writing to the stream', async () => {
    const dbPath = 'test.db';
    await fs.unlink(dbPath).catch(() => {});
    const dirty = new Dirty(dbPath);
    let drainCalled = false;

    dirty.on('drain', () => {
      drainCalled = true;
    });

    dirty.set('key', 'value', () => {
      dirty.set('key2', 'value2', () => {
        dirty.set('key3', 'value3');
      });
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(drainCalled).toBe(true);
    await fs.unlink(dbPath);
  });
});