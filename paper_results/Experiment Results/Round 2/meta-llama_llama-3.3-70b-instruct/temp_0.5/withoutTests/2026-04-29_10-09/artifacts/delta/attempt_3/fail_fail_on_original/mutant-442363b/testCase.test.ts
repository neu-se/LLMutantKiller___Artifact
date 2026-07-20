import Iterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';

describe('OpIterator', () => {
  it('should correctly handle retain object', () => {
    const op1 = { retain: {} };
    const iterator = new Iterator([op1]);
    expect(iterator.peekType()).toBe('retain');
    const op2 = { retain: {} };
    op2.retain = null;
    const iterator2 = new Iterator([op2]);
    expect(iterator2.peekType()).toBe('retain');
  });
});