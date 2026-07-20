import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts';

describe('OpIterator', () => {
  it('peekType() should return "retain" when op.retain is an object', () => {
    const ops = [{ retain: { test: 'object' } }, { retain: 1 }];
    const iterator = new OpIterator(ops);
    iterator.next();
    expect(iterator.peekType()).toBe('retain'); 
    const ops2 = [{ retain: { test: 'object' } }];
    const iterator2 = new OpIterator(ops2);
    expect(iterator2.peekType()).toBe('retain'); // This should pass on the original code and fail on the mutated code
  });
});