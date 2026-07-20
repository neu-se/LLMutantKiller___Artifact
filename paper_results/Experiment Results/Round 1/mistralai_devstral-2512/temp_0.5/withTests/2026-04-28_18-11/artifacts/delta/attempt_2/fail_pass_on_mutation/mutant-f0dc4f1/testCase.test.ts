import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator peekType', () => {
  it('should correctly identify retain operations with object values', () => {
    const ops = [{ retain: { figure: true }, attributes: { src: 'http://example.com' } }];
    const iterator = new OpIterator(ops);
    expect(iterator.peekType()).toBe('retain');
    iterator.next();
    expect(iterator.peekType()).toBe('retain');
  });
});