import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator next() with null retain object', () => {
  it('should skip retain object when it is null', () => {
    const ops = [{ retain: null }, { insert: 'test' }];
    const iterator = new Iterator(ops);
    const firstResult = iterator.next(1);
    expect(firstResult).toEqual({ insert: 'test' });
  });
});