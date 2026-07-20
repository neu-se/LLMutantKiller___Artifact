import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator', () => {
  it('peekType() returns "retain" string for retain op with numeric value, used in conditional branching', () => {
    const iter = new OpIterator([{ retain: 5 }]);
    const type = iter.peekType();
    // In mutated code the if block body is empty so no return statement executes
    // causing the function to return undefined instead of 'retain'
    expect(type === 'retain').toBe(true);
  });
});