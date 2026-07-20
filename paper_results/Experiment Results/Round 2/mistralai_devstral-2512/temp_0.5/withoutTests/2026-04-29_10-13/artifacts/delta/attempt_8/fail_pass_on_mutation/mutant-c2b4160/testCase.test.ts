import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator rest method', () => {
  it('should return remaining operations when offset is zero and index is not at start', () => {
    const ops = [
      { insert: 'first' },
      { insert: 'second' },
      { insert: 'third' }
    ];
    const iterator = new Iterator(ops);
    iterator.next(5); // Consume first op completely
    const result = iterator.rest();
    expect(result).toEqual([
      { insert: 'second' },
      { insert: 'third' }
    ]);
  });
});