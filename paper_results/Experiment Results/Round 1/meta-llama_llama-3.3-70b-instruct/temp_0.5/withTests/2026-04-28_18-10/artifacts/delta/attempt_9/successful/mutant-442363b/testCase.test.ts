import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts';

describe('OpIterator', () => {
  it('should return the correct type for retain operations with object retain', () => {
    const ops = [
      { retain: { test: 'object' } },
    ];
    const iterator = new OpIterator(ops);
    expect(iterator.peekType()).toBe('retain');
  });

  it('should return the correct type for retain operations with number retain', () => {
    const ops = [
      { retain: 5 },
    ];
    const iterator = new OpIterator(ops);
    expect(iterator.peekType()).toBe('retain');
  });

  it('should return retain when retain is an object and not null', () => {
    const ops = [
      { retain: { test: 'object' } },
    ];
    const iterator = new OpIterator(ops);
    expect(iterator.peekType()).toBe('retain');
    const ops2 = [
      { retain: null },
    ];
    const iterator2 = new OpIterator(ops2);
    expect(iterator2.peekType()).not.toBe('retain'); // This should pass on the original code and fail on the mutated code
  });
});