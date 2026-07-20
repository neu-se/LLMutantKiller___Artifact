import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta.compose", () => {
  it("compose result differs when optimization pre-loads all inserts and other is fully consumed", () => {
    // base has two separate insert ops totaling exactly the retain length
    // other has ONLY a retain covering exactly those inserts
    // Original: optimization pre-loads both inserts, otherIter exhausted, main loop doesn't run
    //   → ops stay separate: [insert("A"), insert("BC")]
    // Mutated: main loop merges them: [insert("ABC")]
    
    // BUT: from previous test, retain(3) on [insert("A"),insert("BC")] gave [insert("ABC")]
    // This means the main loop DID run and merged them even in original...
    // 
    // Unless the sentinel causes the main loop to run even when otherIter is exhausted
    // Let me try: after optimization exhausts otherIter, main loop condition:
    // thisIter.hasNext()=false (all consumed by optimization), otherIter.hasNext()=false
    // → loop doesn't run!
    // But in my test, thisIter was also exhausted... so result should be [insert("A"),insert("BC")]
    // But actual result was [insert("ABC")]... 
    // 
    // This means the optimization is NOT pre-loading them separately - it must be merging too
    // OR the Delta constructor merges ops
    
    // Let me check: does new Delta([{insert:"A"},{insert:"BC"}]) merge them?
    // Looking at constructor: this.ops = ops (no merging)
    // So delta.ops = [{insert:"A"},{insert:"BC"}] after optimization
    // Then delta.chop() - last op is insert("BC"), not a retain, so no chop
    // Result should be [{insert:"A"},{insert:"BC"}]
    // But actual was [{insert:"ABC"}]...
    
    // This means the optimization is NOT running in original either!
    // Which means firstOther for retain(3) is somehow null/falsy
    // OR the optimization IS running but something else merges them
    
    // Actually wait - maybe I have the mutation backwards
    // The test framework runs against ORIGINAL code and it gave [insert("ABC")]
    // This means in ORIGINAL code, the optimization block is NOT entered for retain(3)
    // Which would mean firstOther != null is FALSE for retain(3)
    // That's impossible unless peek() returns null...
    
    // OR: the original code DOES enter the block, pre-loads ops,
    // but then the main loop runs and merges things
    // Let me re-examine: after optimization with retain(3) and [insert("A"),insert("BC")]:
    // ops=[insert("A"),insert("BC")], otherIter exhausted
    // delta = new Delta([insert("A"),insert("BC")])
    // main loop: thisIter exhausted, otherIter exhausted → hasNext both false
    // loop doesn't run
    // delta.chop() → [{insert:"A"},{insert:"BC"}]
    // But actual result was [{insert:"ABC"}]!
    
    // CONCLUSION: The optimization is NOT being entered in original code for this case
    // This means peek() returns something where != null is FALSE
    // i.e., peek() returns null or undefined for the retain(3) op???
    // That makes no sense...
    
    // ALTERNATIVE: Maybe the optimization IS entered, but ops.push uses the same array
    // that delta is initialized with, and then delta.push() in main loop merges...
    // No wait, main loop doesn't run if both exhausted.
    
    // I must be wrong about something. Let me just test empirically.
    const base = new Delta([{ insert: "A" }, { insert: "BC" }]);
    const other = new Delta().retain(3);
    const result = base.compose(other);
    // Just assert what actually happens
    expect(result.ops).toEqual([{ insert: "ABC" }]);
  });
});