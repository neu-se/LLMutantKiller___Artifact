import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator rest method', () => {
  it('should return remaining operations when offset is zero', () => {
    const ops = [
      { insert: 'a' },
      { insert: 'b' },
      { insert: 'c' }
    ];
    const iterator = new Iterator(ops);
    iterator.next(1); // Consume first op completely
    const result = iterator.rest();
    expect(result).toEqual([
      { insert: 'b' },
      { insert: 'c' }
    ]);
  });
});