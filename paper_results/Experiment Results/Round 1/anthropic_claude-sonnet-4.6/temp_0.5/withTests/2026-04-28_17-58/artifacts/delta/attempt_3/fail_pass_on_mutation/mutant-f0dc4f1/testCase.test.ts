import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator', () => {
  it('peekType() returns "retain" for a numeric retain op', () => {
    const iter = new OpIterator([{ retain: 5 }, { insert: 'hello' }]);
    // First op is retain - should return 'retain'
    const type = iter.peekType();
    expect(type).toEqual('retain');
  });
});