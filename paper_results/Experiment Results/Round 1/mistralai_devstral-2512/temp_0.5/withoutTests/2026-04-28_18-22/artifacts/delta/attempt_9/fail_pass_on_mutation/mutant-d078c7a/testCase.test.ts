import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator next() with retain object', () => {
  it('should correctly handle retain object when offset is 0 and length is 1', () => {
    const ops = [{ retain: { bold: true } }];
    const iterator = new Iterator(ops);
    const result = iterator.next(1);
    expect(result).toEqual({ retain: { bold: true } });
    expect(iterator.peek()).toBeUndefined();
  });
});