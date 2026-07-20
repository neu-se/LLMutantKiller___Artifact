import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator peekType', () => {
  it('should correctly identify retain operations with object values', () => {
    const ops = [{ retain: { color: 'red' } }];
    const iterator = new Iterator(ops);
    const type = iterator.peekType();
    expect(type).toBe('retain');
    // Also verify the operation itself
    const op = iterator.next();
    expect(op).toHaveProperty('retain', { color: 'red' });
  });
});