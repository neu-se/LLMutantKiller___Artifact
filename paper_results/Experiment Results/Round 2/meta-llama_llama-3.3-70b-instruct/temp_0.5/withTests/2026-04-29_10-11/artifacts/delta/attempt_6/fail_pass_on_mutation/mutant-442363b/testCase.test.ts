import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts';

describe('OpIterator', () => {
  it('peekType() with null check', () => {
    const ops = [
      { retain: { foo: 'bar' } },
    ];
    const iterator = new OpIterator(ops);
    expect(iterator.peekType()).toBe('retain');
  });
});