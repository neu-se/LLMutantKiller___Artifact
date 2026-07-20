import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator peekType', () => {
  it('should return "retain" for object retain operations', () => {
    const ops = [{ retain: { figure: true } }];
    const iterator = new OpIterator(ops);
    const type = iterator.peekType();
    expect(type).toBe('retain');
    expect(type).toBeDefined();
  });
});