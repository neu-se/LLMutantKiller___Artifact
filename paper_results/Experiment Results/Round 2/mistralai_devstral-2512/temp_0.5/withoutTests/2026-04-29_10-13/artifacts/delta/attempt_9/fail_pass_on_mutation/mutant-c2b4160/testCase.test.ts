import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator rest method', () => {
  it('should handle the case where offset is zero and return the remaining operations', () => {
    const ops = [
      { insert: 'test' },
      { retain: 3 }
    ];
    const iterator = new Iterator(ops);
    const result = iterator.rest();
    expect(result).toEqual(ops);
  });
});