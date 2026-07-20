import Iterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts';

describe('OpIterator', () => {
  it('rest() on empty iterator', () => {
    const ops = [];
    const iterator = new Iterator(ops);
    if (!iterator.hasNext()) {
      expect(iterator.rest()).not.toThrow();
    } else {
      throw new Error('Expected no next operation');
    }
  });
});