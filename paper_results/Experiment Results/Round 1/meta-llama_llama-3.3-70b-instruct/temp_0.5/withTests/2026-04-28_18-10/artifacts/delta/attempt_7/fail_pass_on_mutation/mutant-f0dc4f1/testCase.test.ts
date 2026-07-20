import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';

describe('OpIterator', () => {
  it('should return the correct type when peekType is called with a retain op that has an object value for retain and no return statement in the else if condition', () => {
    const ops = [
      { retain: { bold: true } },
    ];
    const iterator = new OpIterator(ops);
    expect(iterator.peekType()).not.toBe('insert');
  });
});