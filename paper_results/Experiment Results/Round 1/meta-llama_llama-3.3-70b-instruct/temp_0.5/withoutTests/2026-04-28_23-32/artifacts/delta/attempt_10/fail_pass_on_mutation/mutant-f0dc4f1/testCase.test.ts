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
    expect(() => {
      iterator2.peekType();
      iterator2.next();
      iterator2.peekType();
    }).not.toThrow();
  });
});