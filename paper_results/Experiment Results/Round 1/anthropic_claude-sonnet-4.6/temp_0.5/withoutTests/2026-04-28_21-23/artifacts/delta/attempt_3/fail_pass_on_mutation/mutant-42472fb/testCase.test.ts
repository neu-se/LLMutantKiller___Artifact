import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('exposes mutation via early exit with rest containing inserts', () => {
    // this: [{insert:"A"}, {insert:"B"}, {retain:3}]
    // other: [{retain:2}, {retain:3}] -- split retain to prevent merging
    // Actually other ops merge... need attributes
    
    // this: [{insert:"A"}, {insert:"B"}, {retain:3}]  
    // other: [{retain:2}, {retain:3, attributes:{bold:true}}]
    // With opt: firstOther={retain:2} (no attrs), moves "A" and "B" to ops (each len 1, total 2 = firstOther.retain)
    //   otherIter advanced by 2 (past first op entirely)
    //   delta=[insert"A",insert"B"] = [{insert:"AB"}]
    //   main loop: thisIter retain:3, otherIter retain:3 bold
    //   length=3, thisOp=retain:3, otherOp=retain:3 bold
    //   newOp.retain=3, attributes=compose(undefined, {bold:true}, true)={bold:true}
    //   newOp={retain:3, attributes:{bold:true}}
    //   early exit: !otherIter.hasNext() && isEqual(last={retain:3,attrs:{bold:true}}, newOp) → yes
    //   rest = thisIter.rest() = [] (exhausted)
    //   return [{insert:"AB"},{retain:3,attrs:{bold:true}}].chop() = [{insert:"AB"},{retain:3,attrs:{bold:true}}]
    
    // Without opt: delta=[]
    //   main loop iter1: thisIter insert"A", otherIter retain:2
    //     length=1, thisOp=insert"A", otherOp=retain:1
    //     newOp.insert="A", delta=[insert"A"]
    //     !otherIter.hasNext()? otherIter still has retain:1 + retain:3 bold. No.
    //   iter2: thisIter insert"B", otherIter retain:1 (remaining from retain:2)
    //     length=1, thisOp=insert"B", otherOp=retain:1
    //     newOp.insert="B", delta=[insert"AB"]
    //     !otherIter.hasNext()? otherIter has retain:3 bold. No.
    //   iter3: thisIter retain:3, otherIter retain:3 bold
    //     length=3, thisOp=retain:3, otherOp=retain:3 bold
    //     newOp={retain:3, attrs:{bold:true}}
    //     early exit: !otherIter.hasNext() → yes, isEqual → yes
    //     rest = thisIter.rest() = []
    //     return [{insert:"AB"},{retain:3,attrs:{bold:true}}].chop() = same!
    // Still same...
    
    const a = new Delta().insert('A').insert('B').retain(3);
    const b = new Delta().retain(2).retain(3, { bold: true });
    const result = a.compose(b);
    expect(result.ops).toEqual([
      { insert: 'AB' },
      { retain: 3, attributes: { bold: true } },
    ]);
  });
});