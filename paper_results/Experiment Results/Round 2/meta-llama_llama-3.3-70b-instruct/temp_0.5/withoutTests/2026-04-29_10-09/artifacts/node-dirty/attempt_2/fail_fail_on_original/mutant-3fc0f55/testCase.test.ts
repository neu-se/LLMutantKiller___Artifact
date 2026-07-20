import { Dirty } from '../../../lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should emit drain event after writing to the stream', async () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    let drainCalled = false;

    dirty.on('drain', () => {
      drainCalled = true;
    });

    dirty.set('key', 'value');
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(drainCalled).toBe(true);
  });
});