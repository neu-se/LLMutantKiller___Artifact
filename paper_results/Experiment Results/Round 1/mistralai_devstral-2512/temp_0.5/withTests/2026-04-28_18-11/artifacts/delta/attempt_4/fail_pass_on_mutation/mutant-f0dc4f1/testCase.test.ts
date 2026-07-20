import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator peekType', () => {
  it('should return "retain" for object retain operations', () => {
    const ops = [{ retain: { figure: true } }];
    const iterator = new OpIterator(ops);
    expect(iterator.peekType()).toBe('retain');
  });
});