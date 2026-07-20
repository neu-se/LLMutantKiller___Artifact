import Iterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';

describe('OpIterator', () => {
  it('should correctly handle retain object', () => {
    const op1 = { retain: null };
    const iterator = new Iterator([op1]);
    expect(iterator.peekType()).toBe('insert');
    const op2 = { retain: {} };
    const iterator2 = new Iterator([op2]);
    expect(iterator2.peekType()).toBe('retain');
  });
});