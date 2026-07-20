import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('detects mutation in transformedData assignment for number retain', () => {
    // Force a scenario where otherData is a number but length differs
    // by using an insert in `this` that shifts positions
    // this: insert('ab') - length 2
    // other: retain(1, {bold: true})
    // 
    // Loop iteration 1:
    //   thisIter.peekType() = 'insert', priority=false, otherIter.peekType()='retain' (not insert)
    //   → delta.retain(2), thisIter advances
    //   otherIter NOT advanced
    //
    // Loop iteration 2:
    //   thisIter exhausted, otherIter at retain(1, bold)
    //   otherIter.peekType() = 'retain' (not insert)
    //   else branch: length = min(Inf, 1) = 1
    //   thisOp = {retain: 1}, otherOp = {retain: 1, bold}
    //   otherData = 1 = length → same for both
    
    const a = new Delta().insert('ab');
    const b = new Delta().retain(1, { bold: true });
    const result = a.transform(b, false);
    expect(result).toEqual(new Delta().retain(2).retain(1, { bold: true }));
  });
});