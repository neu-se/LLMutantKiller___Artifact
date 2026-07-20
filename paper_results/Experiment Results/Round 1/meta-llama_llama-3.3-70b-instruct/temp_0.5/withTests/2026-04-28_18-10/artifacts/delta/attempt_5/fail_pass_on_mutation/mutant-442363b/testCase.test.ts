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

  it('should return insert for retain operations with true condition on mutated code', () => {
    const ops = [
      { retain: true },
    ];
    const iterator = new OpIterator(ops);
    expect(iterator.peekType()).toBe('insert'); // This should pass on the mutated code and fail on the original code
  });
});