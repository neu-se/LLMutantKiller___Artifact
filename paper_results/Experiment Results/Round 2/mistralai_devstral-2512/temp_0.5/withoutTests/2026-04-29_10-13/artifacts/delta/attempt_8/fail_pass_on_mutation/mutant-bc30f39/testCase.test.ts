import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator rest method', () => {
  it('should return remaining operations when iterator is not exhausted', () => {
    const ops = [{ retain: 5 }, { insert: 'test' }];
    const iterator = new Iterator(ops);
    iterator.next(3); // Partially consume first operation
    const result = iterator.rest();
    expect(result).toEqual([
      { retain: 2 },
      { insert: 'test' }
    ]);
  });
});