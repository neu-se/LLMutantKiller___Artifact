import Delta from "../../src/Delta";

describe('compose() with null retain and delete', () => {
  it('does not push delete when thisOp retain is null (insert op)', () => {
    // When thisOp is an insert (retain is undefined/null-like), 
    // and otherOp is delete, they should cancel out
    // Create a scenario where thisOp.retain is null explicitly
    const a = new Delta([{ retain: null as any }]);
    const b = new Delta().delete(1);
    const expected = new Delta();
    expect(a.compose(b)).toEqual(expected);
  });
});