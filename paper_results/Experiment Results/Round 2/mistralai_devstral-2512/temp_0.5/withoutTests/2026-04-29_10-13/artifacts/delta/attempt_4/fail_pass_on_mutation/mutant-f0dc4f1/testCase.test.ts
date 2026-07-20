import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe('Iterator peekType', () => {
  it('should return "retain" for object retain operations with attributes', () => {
    const ops = [{ retain: { key: 'value' } }];
    const iterator = new Iterator(ops);
    expect(iterator.peekType()).toBe('retain');
  });
});