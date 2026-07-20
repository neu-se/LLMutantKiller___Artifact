import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should emit drain event after closing the db file streams when queue is not empty', async () => {
    const dirty = new Dirty('test.db');
    dirty.set('key', 'value');
    dirty.close();
    let drained = false;
    dirty.on('drain', () => {
      drained = true;
    });
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
    expect(drained).toBe(true);
  });
});