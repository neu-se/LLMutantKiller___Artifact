import Iterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';
import { Op } from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('OpIterator', () => {
  it('should correctly handle retain object', () => {
    const op1: Op = { retain: {} };
    const iterator = new Iterator([op1]);
    expect(iterator.peekType()).toBe('retain');
    const op2: Op = { retain: undefined };
    const iterator2 = new Iterator([op2]);
    expect(iterator2.peekType()).toBe('retain');
  });
});