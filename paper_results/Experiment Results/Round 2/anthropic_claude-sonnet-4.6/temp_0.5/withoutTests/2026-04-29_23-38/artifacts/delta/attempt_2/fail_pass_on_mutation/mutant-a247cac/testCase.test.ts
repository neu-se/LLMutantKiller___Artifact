import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose', () => {
  it('should use optimization when last delta op equals current newOp and other has no more ops', () => {
    // Construct a case where:
    // 1. otherIter runs out (no more ops after current)
    // 2. delta.ops[delta.ops.length - 1] equals newOp
    // The optimization appends thisIter.rest() directly
    // Without optimization, the loop would process remaining this ops normally
    
    // this: retain(5), insert("X")  
    // other: retain(5)
    // When processing retain(5)/retain(5): newOp = {retain:5}, pushed to delta
    // delta.ops = [{retain:5}], delta.ops[delta.ops.length-1] = {retain:5} = newOp ✓
    // otherIter has no more ops ✓
    // optimization: return delta.concat([insert("X")]).chop()
    // = {retain:5, insert:"X"}.chop() = {retain:5, insert:"X"}
    // without optimization: loop ends, delta.chop() = {retain:5} (insert("X") is lost!)
    
    const a = new Delta().retain(5).insert('X');
    const b = new Delta().retain(5);
    
    const result = a.compose(b);
    
    // With optimization: retain(5) + insert("X") preserved
    // Without optimization: insert("X") is lost
    expect(result.ops).toEqual([{ retain: 5 }, { insert: 'X' }]);
  });
});