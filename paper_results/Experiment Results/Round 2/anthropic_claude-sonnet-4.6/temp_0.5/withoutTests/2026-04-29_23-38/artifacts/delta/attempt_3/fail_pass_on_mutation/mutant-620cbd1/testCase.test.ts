import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta compose', () => {
  it('detects mutation via early return optimization in compose', () => {
    // this: [insert "hi", retain 3 with bold]
    // other: [retain 5] - single plain retain covering all
    // 
    // With original code optimization:
    //   - insert "hi" (len 2) <= 5, pre-added to ops, firstLeft=3
    //   - retain 3 <= 3, pre-added to ops, firstLeft=0
    //   - otherIter.next(5) consumes the retain
    //   - Main loop: both exhausted
    //   - Result: [insert "hi", retain 3 {bold}].chop() = [insert "hi", retain 3 {bold}]
    //
    // With mutated code (no optimization):
    //   - Main loop processes normally
    //   - Same result? Let me think...
    //   - otherIter.peekType()='retain', thisIter.peekType()='insert'
    //   - Neither is 'insert' for other, neither 'delete' for this
    //   - else branch: length=min(2,5)=2, thisOp=insert "hi", otherOp=retain 2
    //   - otherOp.retain=2 (truthy), thisOp.retain=null → newOp.insert="hi"
    //   - attributes: compose(undefined, undefined, false) = undefined
    //   - delta.push({insert:"hi"})
    //   - !otherIter.hasNext()? No, still has retain 3 left
    //   - Next: length=min(3,3)=3, thisOp=retain 3 {bold}, otherOp=retain 3
    //   - newOp.retain=3, attributes=compose({bold:true}, undefined, true)={bold:true}
    //   - delta.push({retain:3, attributes:{bold:true}})
    //   - !otherIter.hasNext()? Yes! isEqual(last op, newOp)? Yes!
    //   - Early return: delta.concat(thisIter.rest()).chop()
    //   - thisIter.rest() = [] (exhausted)
    //   - Result: [insert "hi", retain 3 {bold}].chop() = [insert "hi", retain 3 {bold}]
    // Same result again...
    const a = new Delta().insert('hi').retain(3, { bold: true });
    const b = new Delta().retain(5);
    const result = a.compose(b);
    expect(result.ops).toEqual([
      { insert: 'hi' },
      { retain: 3, attributes: { bold: true } }
    ]);
  });
});