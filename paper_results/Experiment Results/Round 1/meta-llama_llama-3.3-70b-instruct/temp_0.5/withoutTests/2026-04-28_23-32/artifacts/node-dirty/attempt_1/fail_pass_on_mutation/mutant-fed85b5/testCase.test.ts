import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('should iterate over all keys when no callback returns false', () => {
    const dirty = new Dirty(null);
    dirty.set('key1', 'value1');
    dirty.set('key2', 'value2');
    dirty.set('key3', 'value3');

    let count = 0;
    dirty.forEach(() => {
      count++;
    });

    expect(count).toBe(3);
  });
});