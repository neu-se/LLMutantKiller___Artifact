import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts';

describe('OpIterator', () => {
  it('peekType() should return "retain" when op.retain is a number and "retain" when op.retain is an object', () => {
    const ops = [{ retain: 1 }, { retain: { test: 'object' } }];
    const iterator = new OpIterator(ops);
    expect(iterator.peekType()).toBe('retain');
    iterator.next();
    expect(iterator.peekType()).toBe('retain'); 
  });
});