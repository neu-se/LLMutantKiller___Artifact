import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator peekType', () => {
  it('should return "retain" for object retain operations with null check', () => {
    const ops = [{ retain: { figure: true }, attributes: { src: 'http://example.com' } }];
    const iterator = new OpIterator(ops);
    const type = iterator.peekType();
    expect(type).toBe('retain');
    expect(type).not.toBe('insert');
  });
});