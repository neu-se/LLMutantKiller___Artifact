import Iterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';
import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('OpIterator', () => {
  it('should return the correct type when retain is an object', () => {
    const op: Op = { retain: {} };
    const iterator = new Iterator([op]);
    expect(iterator.peekType()).toBe('retain');
  });
});