import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';

describe('OpIterator', () => {
  it('should return the correct type when peekType is called with a retain op that has an object value for retain and then a delete op', () => {
    const ops = [
      { retain: { bold: true } },
      { delete: 1 },
    ];
    const iterator = new OpIterator(ops);
    iterator.next();
    expect(iterator.peekType()).toBe('delete');
  });
});