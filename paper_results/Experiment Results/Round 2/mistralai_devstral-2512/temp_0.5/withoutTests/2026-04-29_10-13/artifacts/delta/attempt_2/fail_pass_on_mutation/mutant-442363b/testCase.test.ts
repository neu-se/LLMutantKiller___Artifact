import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator peekType', () => {
  it('should correctly identify retain type for object retain with null value', () => {
    const ops = [{ retain: { key: 'value' } }];
    const iterator = new Iterator(ops);
    expect(iterator.peekType()).toBe('retain');
  });
});