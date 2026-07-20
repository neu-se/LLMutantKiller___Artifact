import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator rest method', () => {
  it('should handle empty operations array correctly', () => {
    const ops: any[] = [];
    const iterator = new Iterator(ops);
    const result = iterator.rest();
    expect(result).toEqual([]);
  });
});