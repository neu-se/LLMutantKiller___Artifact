import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("transform()", () => {
  it("delete + delete with mixed lengths exposes continue vs no-op difference", () => {
    // Use a case where after thisOp.delete, the loop would behave differently
    // if continue is missing - specifically when there are more ops after
    const a = new Delta().delete(1).insert('A');
    const b = new Delta().delete(1).insert('B');
    // With priority=true:
    // First iteration: thisIter.peekType()='delete', otherIter.peekType()='delete'
    // Neither is 'insert' with priority conditions met
    // thisOp={delete:1}, otherOp={delete:1}
    // Original: continue -> next iteration
    // Mutated: empty if block, else-if(otherOp.delete) is skipped, else is skipped -> same as continue?
    // Hmm still same...
    
    // Let me try: a=delete, b=retain where after the if/else chain 
    // there might be code that runs differently
    const a2 = new Delta().delete(1);
    const b2 = new Delta().retain(1);
    const expected2 = new Delta();
    expect(a2.transform(b2, true)).toEqual(expected2);
  });
});