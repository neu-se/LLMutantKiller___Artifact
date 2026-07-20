import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator', () => {
  it('peekType() returns "retain" for an object retain op (non-null object)', () => {
    // Using an object retain which hits the second condition: typeof retain === 'object' && retain !== null
    const iter = new OpIterator([{ retain: { someEmbed: true } }]);
    const type = iter.peekType();
    expect(type).toEqual('retain');
  });
});