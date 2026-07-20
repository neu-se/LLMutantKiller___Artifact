import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('forEach iteration behavior', () => {
  it('should continue iteration when callback returns true', () => {
    const db = new Dirty();
    db.set('key1', 'value1');
    db.set('key2', 'value2');
    db.set('key3', 'value3');

    const visitedKeys: string[] = [];

    db.forEach((key, val) => {
      visitedKeys.push(key);
      return true;
    });

    expect(visitedKeys).toEqual(['key1', 'key2', 'key3']);
  });
});