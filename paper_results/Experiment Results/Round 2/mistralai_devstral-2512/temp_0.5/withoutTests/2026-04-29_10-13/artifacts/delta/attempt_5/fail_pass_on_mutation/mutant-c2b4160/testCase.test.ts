import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator rest method', () => {
  it('should return correct operations when offset is zero and index is at start', () => {
    const ops = [
      { insert: 'first' },
      { insert: 'second' }
    ];
    const iterator = new Iterator(ops);
    const result = iterator.rest();
    expect(result).toEqual(ops);
  });
});