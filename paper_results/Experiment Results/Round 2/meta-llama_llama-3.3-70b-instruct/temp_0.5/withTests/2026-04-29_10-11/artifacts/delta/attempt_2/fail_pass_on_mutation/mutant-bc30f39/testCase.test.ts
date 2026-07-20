import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts';

describe('OpIterator', () => {
  it('rest() on iterator with no next operations', () => {
    const ops = [{ insert: 'Hello' }, { retain: 3 }, { delete: 2 }];
    const iterator = new OpIterator(ops);
    iterator.next();
    expect(iterator.rest()).toEqual([{ retain: 3 }, { delete: 2 }]);
  });

  it('rest() on iterator with no next operations and hasNext() is false', () => {
    const ops = [];
    const iterator = new OpIterator(ops);
    expect(iterator.rest()).not.toEqual(undefined);
  });
});