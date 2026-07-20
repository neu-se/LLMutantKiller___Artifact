import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator peekType', () => {
  it('should return "retain" for object retain operations and not undefined', () => {
    const ops = [{ retain: {} }];
    const iterator = new Iterator(ops);
    const type = iterator.peekType();
    expect(type).toBe('retain');
    expect(type).toBeDefined();
  });
});