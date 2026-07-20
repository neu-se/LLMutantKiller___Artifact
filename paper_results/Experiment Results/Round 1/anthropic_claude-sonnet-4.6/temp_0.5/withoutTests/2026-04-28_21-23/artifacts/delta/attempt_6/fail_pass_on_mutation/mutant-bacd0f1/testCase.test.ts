import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('should correctly transform when other delta has retain followed by more ops', () => {
    const a = new Delta().retain(3).insert('X');
    const b = new Delta().retain(4, { bold: true });

    const result = a.transform(b, false);
    // a: retain(3), insert('X')
    // b: retain(4, {bold:true})
    // Step 1: neither is insert/delete in else branch
    //   length = min(3, 4) = 3
    //   thisOp = retain(3), otherOp = retain(3, {bold:true})
    //   otherData = 3, length = 3
    //   transformedData = 3 (both original and mutated)
    //   delta.retain(3, {bold:true})
    // Step 2: thisIter has insert('X'), otherIter has retain(1, {bold:true})
    //   thisIter.peekType() === 'insert', priority=false, otherIter.peekType() !== 'insert'
    //   -> delta.retain(1) [for insert 'X']
    // Step 3: thisIter empty, otherIter has retain(1, {bold:true})
    //   else branch: length = min(Inf, 1) = 1
    //   thisOp = {retain: Inf}, otherOp = retain(1, {bold:true})
    //   otherData = 1, length = 1
    //   transformedData = 1 (both)
    //   delta.retain(1, {bold:true})
    // Result: retain(3,{bold}), retain(1), retain(1,{bold}) -> retain(3,{bold}), retain(1), retain(1,{bold})
    expect(result.ops).toEqual([
      { retain: 3, attributes: { bold: true } },
      { retain: 1 },
      { retain: 1, attributes: { bold: true } },
    ]);
  });
});