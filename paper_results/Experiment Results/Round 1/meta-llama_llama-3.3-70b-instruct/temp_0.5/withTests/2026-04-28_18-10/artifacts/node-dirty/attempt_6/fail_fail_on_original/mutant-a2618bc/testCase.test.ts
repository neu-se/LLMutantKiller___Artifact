import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

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
  });
});