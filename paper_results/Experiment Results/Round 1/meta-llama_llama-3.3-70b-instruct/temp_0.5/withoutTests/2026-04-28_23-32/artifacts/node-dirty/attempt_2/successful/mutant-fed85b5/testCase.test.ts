import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('should iterate over all keys even when callback returns true', () => {
    const dirty = new Dirty(null);
    dirty.set('key1', 'value1');
    dirty.set('key2', 'value2');
    dirty.set('key3', 'value3');

    let count = 0;
    dirty.forEach((key, val) => {
      count++;
      return true; // This should not break the loop in the original code
    });

    expect(count).toBe(3);
  });
});