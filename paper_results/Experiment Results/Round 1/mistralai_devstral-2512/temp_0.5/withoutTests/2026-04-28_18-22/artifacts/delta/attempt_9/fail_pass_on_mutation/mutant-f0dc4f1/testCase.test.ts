import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator peekType', () => {
  it('should return "retain" for object retain operations and not return undefined', () => {
    const ops = [{ retain: {} }];
    const iterator = new Iterator(ops);
    const type = iterator.peekType();
    expect(type).toBe('retain');
    // The mutation causes the else block to be empty, which would return undefined
    expect(type).not.toBeUndefined();
  });
});