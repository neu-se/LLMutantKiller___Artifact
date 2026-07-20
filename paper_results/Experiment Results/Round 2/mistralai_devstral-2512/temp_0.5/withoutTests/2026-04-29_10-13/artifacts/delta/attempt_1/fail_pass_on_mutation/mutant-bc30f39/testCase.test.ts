import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator rest method', () => {
  it('should return empty array when no more operations are available', () => {
    const ops = [];
    const iterator = new Iterator(ops);
    expect(iterator.rest()).toEqual([]);
  });
});