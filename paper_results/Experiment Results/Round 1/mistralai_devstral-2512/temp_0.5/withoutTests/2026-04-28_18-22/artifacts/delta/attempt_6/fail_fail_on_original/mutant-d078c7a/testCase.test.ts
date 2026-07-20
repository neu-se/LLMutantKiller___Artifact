import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator next() with retain object', () => {
  it('should correctly handle retain object when offset is 0 and length is 1', () => {
    const ops = [{ retain: { bold: true } }, { insert: 'test' }];
    const iterator = new Iterator(ops);
    const firstResult = iterator.next(1);
    expect(firstResult).toEqual({ retain: { bold: true } });
    const secondResult = iterator.next(1);
    expect(secondResult).toEqual({ insert: 'test' });
  });
});