import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('exposes mutation when thisIter exhausts and remaining otherOps have attributes', () => {
    const a = new Delta().retain(3);
    const b = new Delta().retain(3).retain(2, { bold: true });
    // b merges to retain(3).retain(2,{bold:true}) - but push merges plain retains
    // Actually retain(3) then retain(2,{bold:true}) won't merge (different attrs)
    // b.ops = [{retain:3}, {retain:2, attributes:{bold:true}}]
    
    // a: retain(3)
    // b: retain(3), retain(2,{bold:true})
    // Step 1: length=min(3,3)=3, thisOp=retain(3), otherOp=retain(3)
    //   otherData=3, length=3, same, delta.retain(3) 
    // Step 2: thisIter exhausted, otherIter has retain(2,{bold:true})
    //   else branch: length=min(Inf,2)=2
    //   thisOp={retain:Inf}, otherOp=retain(2,{bold:true})
    //   otherData=2, length=2
    //   Original: false -> transformedData=2
    //   Mutated: true -> transformedData=2
    //   SAME! otherData===length
    //   delta.retain(2, {bold:true})
    // Result: retain(3).retain(2,{bold:true}) -> chop keeps attrs -> [{retain:3},{retain:2,attrs}]
    // Wait, retain(3) is plain, chop only removes LAST op if plain retain
    // Last op is retain(2,{bold:true}) - has attrs, not chopped
    // retain(3) stays too
    
    const result = a.transform(b, false);
    expect(result.ops).toEqual([
      { retain: 3 },
      { retain: 2, attributes: { bold: true } }
    ]);
  });
});