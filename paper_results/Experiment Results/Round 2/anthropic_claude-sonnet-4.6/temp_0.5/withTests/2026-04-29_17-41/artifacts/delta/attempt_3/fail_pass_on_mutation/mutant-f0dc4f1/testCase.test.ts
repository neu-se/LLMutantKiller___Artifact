import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator peekType() retain', () => {
  it('should return "retain" when the current op is a numeric retain', () => {
    const iter = new OpIterator([{ retain: 5 }]);
    const type = iter.peekType();
    expect(type).toBe('retain');
  });
});