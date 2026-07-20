import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('should iterate over all keys when fn does not return true', () => {
    const db = new Dirty();
    db.set('key1', 'value1');
    db.set('key2', 'value2');
    db.set('key3', 'value3');

    const keys = [];
    db.forEach((key, val) => {
      keys.push(key);
      // Return false to continue iteration
      return false;
    });

    expect(keys).toEqual(['key1', 'key2', 'key3']);
  });
});