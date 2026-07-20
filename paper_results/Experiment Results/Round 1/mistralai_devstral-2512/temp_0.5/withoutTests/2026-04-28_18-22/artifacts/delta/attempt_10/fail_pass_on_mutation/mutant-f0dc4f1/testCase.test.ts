import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator peekType', () => {
  it('should return "retain" for object retain operations and not fall through to insert', () => {
    const ops = [{ retain: {} }];
    const iterator = new Iterator(ops);
    const type = iterator.peekType();
    expect(type).toBe('retain');
    // The mutation causes the else block to be empty, which would return undefined
    expect(type).not.toBeUndefined();
    // Also ensure it's not falling through to 'insert'
    expect(type).not.toBe('insert');
  });
});