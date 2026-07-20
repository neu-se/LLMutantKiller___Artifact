import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("transform()", () => {
  it("delete op in this with retain op in other where otherOp retain is object should not call handler", () => {
    // The mutation changes continue to empty block
    // If thisOp.delete is truthy and we don't continue, 
    // in original the retain logic (else branch) is skipped via continue
    // In mutated, the else branch is also skipped (it's else if / else)
    // So they should be equivalent UNLESS there's code after the if/else chain
    
    // Let me test the specific case from existing tests that might reveal difference:
    // 'trailing deletes with differing lengths'
    const a1 = new Delta().retain(2).delete(1);
    const b1 = new Delta().delete(3);
    const expected1 = new Delta().delete(2);
    expect(a1.transform(b1, false)).toEqual(expected1);
    
    const a2 = new Delta().retain(2).delete(1);
    const b2 = new Delta().delete(3);
    const expected2 = new Delta();
    expect(b2.transform(a2, false)).toEqual(expected2);
  });
});