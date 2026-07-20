import { OpIterator } from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts';

describe('OpIterator', () => {
  it('peekType() should return "retain" when op.retain is a number', () => {
    const ops = [{ retain: 1 }];
    const iterator = new OpIterator(ops);
    expect(iterator.peekType()).toBe('retain');
  });

  it('peekType() should return "retain" when op.retain is an object in the original code', () => {
    const ops = [{ retain: { test: 'object' } }];
    const iterator = new OpIterator(ops);
    expect(iterator.peekType()).toBe('insert'); // This should fail in the mutated code
  });
});