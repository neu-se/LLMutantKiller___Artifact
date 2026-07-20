import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe('Iterator next() with null retain object', () => {
  it('should handle null retain object correctly', () => {
    const ops = [{ retain: null }];
    const iterator = new Iterator(ops);
    const result = iterator.next(1);
    expect(result).toEqual({ retain: null });
  });
});