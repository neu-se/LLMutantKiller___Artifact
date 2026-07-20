import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("transform() mutation detection", () => {
  it("detects missing continue in thisOp.delete branch by checking otherOp.delete is not pushed when thisOp is also delete", () => {
    // When both this and other have deletes at same position,
    // other's delete should NOT appear in result (it's redundant)
    // Original: continue skips pushing other's delete
    // Mutated: empty if block also skips pushing (else if is skipped) - same result?
    
    // Let me try: what if we need thisOp.delete to be falsy (0)?
    // No, delete(0) is filtered out by the delete() method
    
    // What about: thisOp comes from a retain that was split, making thisOp.delete undefined?
    // In that case thisOp.delete is falsy, so original goes to else-if check
    
    // The ONLY way to get different behavior: if in mutated code,
    // when thisOp.delete is truthy, we somehow reach else-if or else
    // But with if/else if/else, that's impossible
    
    // Maybe the mutation is actually in a DIFFERENT location than I think
    // Let me test the exact scenario from the comment: 
    // "Insert + delete cancels out" - this is about thisOp.insert + otherOp.delete
    
    const a = new Delta().insert('A');
    const b = new Delta().delete(1);
    // thisOp={insert:'A'}, otherOp={delete:1}
    // thisOp.delete is falsy -> go to else if (otherOp.delete) -> push delete
    // But wait - 'insert' type ops are handled by the FIRST branch of while loop
    // So we never reach the else block with insert thisOp
    
    // Hmm, unless priority=false and otherIter also has insert...
    // Actually with a=insert('A'), b=delete(1):
    // thisIter.peekType()='insert', priority=true -> delta.retain(1), thisIter advances
    // otherIter still has delete(1)
    // Next: thisIter empty, otherIter has delete
    // otherIter.peekType()='delete' not 'insert'
    // Go to else: thisIter.next() = {retain: Infinity}, otherIter.next(1) = {delete:1}
    // thisOp={retain:Infinity} -> thisOp.delete is falsy
    // else if (otherOp.delete) -> push delete
    // Result: retain(1).delete(1) -> after chop: retain(1).delete(1)
    const expected = new Delta().retain(1).delete(1);
    expect(a.transform(b, true)).toEqual(expected);
  });
});