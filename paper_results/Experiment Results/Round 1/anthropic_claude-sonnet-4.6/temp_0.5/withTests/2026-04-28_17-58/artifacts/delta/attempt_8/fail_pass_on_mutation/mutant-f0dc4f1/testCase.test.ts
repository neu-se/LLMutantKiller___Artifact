import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator', () => {
  it('peekType() returns "retain" for object-type retain op', () => {
    // Tests the branch: typeof op.retain === 'object' && op.retain !== null
    const iter = new OpIterator([{ retain: { embed: true } }]);
    const type = iter.peekType();
    expect(type).toEqual('retain');
    expect(type).not.toEqual('insert');
  });
});