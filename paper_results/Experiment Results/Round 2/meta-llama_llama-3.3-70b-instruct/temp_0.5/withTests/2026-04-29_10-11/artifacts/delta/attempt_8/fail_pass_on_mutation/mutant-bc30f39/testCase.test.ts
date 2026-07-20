import Iterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts';

describe('OpIterator', () => {
  it('rest() on empty iterator', () => {
    const ops = [];
    const iterator = new Iterator(ops);
    expect(iterator.hasNext()).toBe(false);
    const rest = iterator.rest();
    expect(rest).toEqual([]);
  });
});