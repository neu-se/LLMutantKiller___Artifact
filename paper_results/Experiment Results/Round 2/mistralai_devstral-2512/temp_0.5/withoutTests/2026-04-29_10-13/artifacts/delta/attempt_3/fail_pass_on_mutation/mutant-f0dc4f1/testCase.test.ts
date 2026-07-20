import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe('Iterator peekType', () => {
  it('should return "retain" when no operation is present', () => {
    const ops: any[] = [];
    const iterator = new Iterator(ops);
    expect(iterator.peekType()).toBe('retain');
  });
});