import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator peekType', () => {
  it('should return "retain" for object retain operations', () => {
    const ops = [{ retain: {} }];
    const iterator = new Iterator(ops);
    const result = iterator.peekType();
    expect(result).toBe('retain');
    expect(result).not.toBe('insert');
  });
});