import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('transform with retain operations produces correct output', () => {
    const a = new Delta().retain(3).insert('abc');
    const b = new Delta().retain(3, { bold: true }).insert('xyz');
    
    // priority = false: other's insert comes first
    const result = a.transform(b, false);
    
    // b inserts 'xyz' (not priority, but other's insert goes first)
    // Wait, with priority=false:
    // - thisIter.peekType() = 'retain', otherIter.peekType() = 'retain'
    //   Not (insert && ...), not (insert), else branch
    //   length = min(3, 3) = 3
    //   thisOp = {retain:3}, otherOp = {retain:3, attrs:{bold:true}}
    //   transformedData = 3, attrs = {bold:true}
    //   delta.retain(3, {bold:true})
    // - thisIter.peekType() = 'insert', otherIter.peekType() = 'insert'
    //   priority=false, otherIter.peekType() === 'insert' → NOT (priority || other !== insert)
    //   → else if (otherIter.peekType() === 'insert') → true
    //   delta.push({insert: 'xyz'})
    // - thisIter.peekType() = 'insert', otherIter exhausted (peekType = 'retain')
    //   priority=false || 'retain' !== 'insert' = true
    //   delta.retain(3) (length of 'abc')
    // Result: [{retain:3,attrs:{bold:true}}, {insert:'xyz'}, {retain:3}]
    
    expect(result.ops).toEqual([
      { retain: 3, attributes: { bold: true } },
      { insert: 'xyz' },
      { retain: 3 }
    ]);
  });
});