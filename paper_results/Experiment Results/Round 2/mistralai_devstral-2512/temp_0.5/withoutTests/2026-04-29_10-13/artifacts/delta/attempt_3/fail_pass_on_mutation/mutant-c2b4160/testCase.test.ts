import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator rest method', () => {
  it('should handle offset correctly when offset is zero', () => {
    const ops = [
      { insert: 'test' },
      { retain: 5 }
    ];
    const iterator = new Iterator(ops);
    const result = iterator.rest();
    expect(result).toEqual(ops);
  });
});