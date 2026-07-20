import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator rest method', () => {
  it('should return remaining operations when offset is non-zero', () => {
    const ops = [{ insert: 'hello' }, { retain: 5 }];
    const iterator = new Iterator(ops);
    iterator.next(2); // Partial consumption of first op
    const result = iterator.rest();
    expect(result).toEqual([
      { insert: 'llo' },
      { retain: 5 }
    ]);
  });
});