import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('should iterate over all keys when fn returns false and fail when fn returns true', () => {
    const db = new Dirty();
    db.set('key1', 'value1');
    db.set('key2', 'value2');
    db.set('key3', 'value3');

    let count = 0;
    db.forEach((key: string, val: any) => {
      count++;
      // Return true to break iteration in the mutated code
      return true;
    });

    expect(count).toBe(3); // This should fail on the mutated code
  });
});