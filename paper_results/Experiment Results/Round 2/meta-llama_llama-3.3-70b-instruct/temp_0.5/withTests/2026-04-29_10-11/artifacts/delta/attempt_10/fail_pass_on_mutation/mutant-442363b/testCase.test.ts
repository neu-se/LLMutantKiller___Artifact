import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts';

describe('OpIterator', () => {
  it('peekType() with null check', () => {
    const ops = [
      { retain: { a: 1, b: null } },
    ];
    const iterator = new OpIterator(ops);
    expect(iterator.peekType()).toBe('retain');
    const ops2 = [
      { retain: { a: 1 } },
    ];
    const iterator2 = new OpIterator(ops2);
    expect(iterator2.peekType()).toBe('retain');
    const ops3 = [
      { foo: 'bar' },
    ];
    const iterator3 = new OpIterator(ops3);
    expect(iterator3.peekType()).not.toBe('retain');
  });
});