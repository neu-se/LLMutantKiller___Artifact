import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';
import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('OpIterator', () => {
  it('should return the correct type for a retain operation with object value', () => {
    const op: Op = { retain: {} };
    const iterator = new OpIterator([op]);
    expect(iterator.peekType()).toBe('retain');
    // Test the condition that was changed by the mutation
    const op2: Op = { retain: {} };
    const iterator2 = new OpIterator([op2]);
    expect(iterator2.peekType()).toBe('retain');
    const op3: Op = { retain: {} };
    const iterator3 = new OpIterator([op3]);
    expect(iterator3.peekType()).toBe('retain');
    // Test with multiple ops
    const ops: Op[] = [{ retain: {} }, { retain: {} }, { retain: {} }];
    const iterator4 = new OpIterator(ops);
    expect(iterator4.peekType()).toBe('retain');
    iterator4.next();
    expect(iterator4.peekType()).toBe('retain');
    iterator4.next();
    expect(iterator4.peekType()).toBe('retain');
  });
});