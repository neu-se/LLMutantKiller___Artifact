import { OpIterator } from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts';

describe('OpIterator', () => {
  it('rest() on empty iterator', () => {
    const ops = [];
    const iterator = new OpIterator(ops);
    expect(iterator.rest()).toEqual([]);
  });

  it('rest() on iterator with no next operations', () => {
    const ops = [{ insert: 'Hello' }];
    const iterator = new OpIterator(ops);
    iterator.next();
    expect(iterator.rest()).toEqual([]);
  });

  it('rest() on iterator with next operations', () => {
    const ops = [{ insert: 'Hello' }, { retain: 3 }, { delete: 2 }];
    const iterator = new OpIterator(ops);
    iterator.next();
    expect(iterator.rest()).toEqual([{ retain: 3 }, { delete: 2 }]);
  });

  it('rest() on iterator with offset', () => {
    const ops = [{ insert: 'Hello' }, { retain: 3 }, { delete: 2 }];
    const iterator = new OpIterator(ops);
    iterator.next(2);
    expect(iterator.rest()).toEqual([{ retain: 3 }, { delete: 2 }]);
  });
});