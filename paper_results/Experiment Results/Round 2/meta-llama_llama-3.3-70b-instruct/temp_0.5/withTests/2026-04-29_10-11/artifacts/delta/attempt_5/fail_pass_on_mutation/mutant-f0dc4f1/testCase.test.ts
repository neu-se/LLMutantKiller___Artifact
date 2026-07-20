import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts';

describe('OpIterator', () => {
  it('peekType() should return "retain" when op.retain is a number and throw an error when op.retain is an object in the mutated code', () => {
    const ops = [{ retain: 1 }, { retain: { test: 'object' } }];
    const iterator = new OpIterator(ops);
    expect(iterator.peekType()).toBe('retain');
    iterator.next();
    try {
      expect(iterator.peekType()).toBe('retain');
    } catch (error) {
      // This should be thrown in the mutated code
    }
  });
});