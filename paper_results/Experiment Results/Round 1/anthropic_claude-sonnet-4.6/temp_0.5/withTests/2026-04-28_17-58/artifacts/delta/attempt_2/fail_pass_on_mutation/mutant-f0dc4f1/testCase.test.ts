import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator', () => {
  it('should return "retain" when the current op is a numeric retain', () => {
    const iter = new OpIterator([{ retain: 5 }]);
    expect(iter.peekType()).toEqual('retain');
  });
});