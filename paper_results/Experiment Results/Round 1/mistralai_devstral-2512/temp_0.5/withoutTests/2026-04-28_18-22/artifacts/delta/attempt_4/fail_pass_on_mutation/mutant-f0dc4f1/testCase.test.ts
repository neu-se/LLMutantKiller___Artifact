import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator peekType', () => {
  it('should correctly identify object retain operations', () => {
    const ops = [{ retain: {} }];
    const iterator = new Iterator(ops);
    const type = iterator.peekType();
    expect(type).toBe('retain');
    // This ensures we're not getting undefined or falling through to insert
    expect(['retain', 'insert', 'delete']).toContain(type);
  });
});