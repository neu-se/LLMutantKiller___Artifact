import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator next() with retain object', () => {
  it('should correctly handle retain object with null value', () => {
    const ops = [{ retain: null }];
    const iterator = new Iterator(ops);
    const result = iterator.next();
    expect('retain' in result).toBe(true);
    expect(result.retain).toBeNull();
  });
});