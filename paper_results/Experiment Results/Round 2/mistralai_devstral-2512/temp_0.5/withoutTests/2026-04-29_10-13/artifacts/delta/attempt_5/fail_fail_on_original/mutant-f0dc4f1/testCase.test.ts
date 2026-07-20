import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe('Iterator peekType', () => {
  it('should return "retain" for object retain operations with null value', () => {
    const ops = [{ retain: null }];
    const iterator = new Iterator(ops);
    expect(iterator.peekType()).toBe('retain');
  });
});