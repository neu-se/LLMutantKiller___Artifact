import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should emit drain event after writing to the stream', async () => {
    const dbPath = 'test.db';
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
  });
});