import { OpIterator } from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts';

describe('OpIterator', () => {
  it('peekType() should return "retain" when op.retain is an object', () => {
    const ops = [{ retain: { test: 'object' } }];
    const iterator = new OpIterator(ops);
    expect(iterator.peekType()).toBe('retain');
  });
});