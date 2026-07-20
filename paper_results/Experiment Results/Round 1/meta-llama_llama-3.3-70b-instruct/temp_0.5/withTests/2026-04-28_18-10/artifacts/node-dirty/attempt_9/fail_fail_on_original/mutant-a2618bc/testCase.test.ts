import { Dirty } from '../../../../lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should write all pending changes to disk when flushing', async () => {
    const db = new Dirty();

    db.set('key1', 'value1');
    db.set('key2', 'value2');
    db.set('key3', 'value3');

    await new Promise((resolve) => {
      db.on('drain', resolve);
    });

    expect(db.size()).toBe(3);

    db.set('key4', 'value4');
    await new Promise((resolve) => {
      db.on('drain', resolve);
    });

    // This should fail on the mutated code because it does not write all pending changes to disk.
    expect(db.size()).toBe(4);

    // Introduce a condition that will cause the test to fail on the mutated code.
    if (db.size() !== 4) {
      throw new Error('Dirty database size is not as expected');
    }
  });
});