import Iterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts';

describe('OpIterator', () => {
  it('rest() on empty iterator', () => {
    const ops = [];
    const iterator = new Iterator(ops);
    expect(iterator.rest()).not.toBeNull();
    expect(iterator.rest()).not.toBeUndefined();
    expect(iterator.rest().length).toEqual(0);
  });
});