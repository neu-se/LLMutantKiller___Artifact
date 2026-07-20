import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator rest method', () => {
  it('should return empty array when hasNext returns false due to exhausted operations', () => {
    const ops = [{ retain: 5 }];
    const iterator = new Iterator(ops);
    iterator.next(5); // Exhaust all operations
    const result = iterator.rest();
    expect(result).toEqual([]);
  });
});