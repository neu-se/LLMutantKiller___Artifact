import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose optimization", () => {
  it("detects mutation in compose initial insert optimization", () => {
    // Create a case where the optimization's early consumption of otherIter matters
    // other starts with retain(N) with no attributes
    // this starts with inserts totaling exactly N chars
    // After optimization: otherIter has consumed the retain, thisIter is exhausted of those inserts
    // The key: what comes AFTER in other
    
    // this = insert("AB") then delete would be weird... let's try:
    // this = [insert("A"), insert("B"), retain(1)]  <- but retain needs a base doc
    
    // Actually let's focus on the `ops` array built before `new Delta(ops)`
    // With original: ops = [insert("AB")] before main loop
    // With mutation: ops = [] before main loop, but main loop produces same inserts
    
    // The difference must be in ordering relative to something else in `other`
    // What if other has: retain(2), then DELETE?
    
    // this = [insert("A"), insert("B"), insert("C")]
    // other = [retain(2), delete(1)]  <- but delete on what? other operates on this's result
    // this produces "ABC", other retains 2 ("AB") and deletes 1 ("C")
    // result should be insert("AB")
    
    const a = new Delta().insert("A").insert("B").insert("C");
    const b = new Delta().retain(2).delete(1);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: "AB" }]);
  });
});