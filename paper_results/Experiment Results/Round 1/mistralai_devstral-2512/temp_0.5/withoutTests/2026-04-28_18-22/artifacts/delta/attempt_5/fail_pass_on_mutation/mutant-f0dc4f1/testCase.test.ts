import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator peekType', () => {
  it('should return "retain" for object retain operations and not fall through to insert', () => {
    const ops = [{ retain: {} }];
    const iterator = new Iterator(ops);
    const type = iterator.peekType();
    expect(type).toBe('retain');
    // Explicitly check it's not returning 'insert' which would happen with the mutation
    expect(type).not.toBe('insert');
  });
});