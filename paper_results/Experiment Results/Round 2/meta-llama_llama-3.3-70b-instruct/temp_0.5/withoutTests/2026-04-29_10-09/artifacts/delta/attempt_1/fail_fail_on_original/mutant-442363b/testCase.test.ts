import { Op } from '../../../OpIterator';
import Iterator from '../../../OpIterator';

describe('OpIterator', () => {
  it('should correctly handle null retain', () => {
    const op1: Op = { retain: null };
    const iterator = new Iterator([op1]);
    expect(iterator.peekType()).toBe('retain');
    const op2: Op = { retain: {} };
    const iterator2 = new Iterator([op2]);
    expect(iterator2.peekType()).toBe('retain');
  });
});