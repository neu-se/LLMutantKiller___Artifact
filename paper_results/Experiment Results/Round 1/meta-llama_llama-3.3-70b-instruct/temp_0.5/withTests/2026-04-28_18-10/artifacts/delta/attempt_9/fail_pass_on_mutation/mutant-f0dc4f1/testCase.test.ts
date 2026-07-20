import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';

describe('OpIterator', () => {
  it('should return the correct type when peekType is called with a retain op that has an object value for retain and then next is called', () => {
    const ops = [
      { retain: 1 },
      { retain: { bold: true } },
    ];
    const iterator = new OpIterator(ops);
    iterator.next();
    expect(iterator.peekType()).toBe('retain');
  });
});