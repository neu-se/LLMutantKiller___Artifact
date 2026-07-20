import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator peekType', () => {
  it('should return "retain" for object retain operations with attributes', () => {
    const ops = [{ retain: { font: 'Arial' } }];
    const iterator = new Iterator(ops);
    expect(iterator.peekType()).toBe('retain');
    const op = iterator.next();
    expect(op).toEqual({ retain: { font: 'Arial' } });
  });
});