import Delta from "../../src/Delta";

describe('compose() - delete with insert thisOp', () => {
  it('should not include delete op when thisOp is an insert and otherOp is a delete (insert + delete = cancel)', () => {
    // When 'a' has an insert and 'b' has a delete at the same position,
    // the insert and delete should cancel out, resulting in an empty delta.
    // The mutation changes the condition for pushing the delete op,
    // potentially causing incorrect behavior when thisOp.retain is null (typeof null === 'object').
    // We need a case where thisOp.retain is null but typeof thisOp.retain === 'object' is true.
    // This happens with an explicit { retain: null } op, but more practically,
    // we test the delete of an insert scenario.
    
    // Create a delta where 'a' inserts 'A' and 'b' deletes 1 character
    // The compose should result in an empty delta (insert + delete = cancel)
    const a = new Delta().insert('A');
    const b = new Delta().delete(1);
    const result = a.compose(b);
    const expected = new Delta();
    expect(result).toEqual(expected);
  });
});