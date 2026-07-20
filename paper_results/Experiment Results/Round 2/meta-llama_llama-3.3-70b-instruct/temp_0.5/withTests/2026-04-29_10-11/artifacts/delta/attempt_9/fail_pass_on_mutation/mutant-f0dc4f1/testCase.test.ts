import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts';

describe('OpIterator', () => {
  it('peekType() should return "retain" when op.retain is an object and not "insert"', () => {
    const ops = [{ retain: { test: 'object' } }];
    const iterator = new OpIterator(ops);
    expect(iterator.peekType()).not.toBe('insert'); // This should pass on the original code and fail on the mutated code because in the mutated code, it returns 'insert'
  });
});