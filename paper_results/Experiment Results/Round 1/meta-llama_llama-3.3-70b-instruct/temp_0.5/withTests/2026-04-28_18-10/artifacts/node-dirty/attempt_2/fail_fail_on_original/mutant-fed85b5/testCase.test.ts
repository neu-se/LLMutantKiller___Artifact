import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('should iterate over all keys when fn returns false', () => {
    const db = new Dirty();
    db.set('key1', 'value1');
    db.set('key2', 'value2');
    db.set('key3', 'value3');

    let count = 0;
    db.forEach((key, val) => {
      count++;
      // Return false to continue iteration
      return false;
    });

    expect(count).toBe(3);
  });
});