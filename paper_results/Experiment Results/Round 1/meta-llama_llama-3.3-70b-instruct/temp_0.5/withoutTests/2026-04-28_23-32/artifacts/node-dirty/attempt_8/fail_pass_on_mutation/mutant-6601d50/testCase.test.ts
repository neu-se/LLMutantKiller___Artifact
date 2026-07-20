import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should emit drain event after closing the db file streams when queue is empty', async () => {
    const dirty = new Dirty('test.db');
    dirty.set('key', 'value');
    await new Promise<void>((resolve) => {
      dirty.on('drain', () => resolve());
    });
    dirty.close();
    let drainEmitted = false;
    dirty.on('drain', () => {
      drainEmitted = true;
    });
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
    expect(drainEmitted).toBe(false);
  });
});