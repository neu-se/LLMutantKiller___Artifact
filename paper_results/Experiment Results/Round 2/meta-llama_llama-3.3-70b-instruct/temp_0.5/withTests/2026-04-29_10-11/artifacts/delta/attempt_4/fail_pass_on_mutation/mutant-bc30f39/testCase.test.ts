import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts';

describe('OpIterator', () => {
  it('rest() on empty iterator', () => {
    const ops = [];
    const iterator = new OpIterator(ops);
    if (!iterator.hasNext()) {
      expect(iterator.rest()).toEqual([]);
    }
  });
});