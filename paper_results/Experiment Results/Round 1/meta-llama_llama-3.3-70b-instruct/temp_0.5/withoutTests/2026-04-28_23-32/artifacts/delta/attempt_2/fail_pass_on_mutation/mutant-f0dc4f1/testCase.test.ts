import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';
import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('OpIterator', () => {
  it('should return the correct type for a retain operation', () => {
    const op: Op = { retain: {} };
    const iterator = new OpIterator([op]);
    expect(iterator.peekType()).toBe('retain');
  });
});