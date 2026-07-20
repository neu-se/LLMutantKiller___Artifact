import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe("Iterator.rest()", () => {
  it("detects mutation: rest() with offset=0 should return slice not next+rest", () => {
    // Use a retain number op followed by more ops
    // When offset=0, original: ops.slice(index) returns reference to original ops
    // Mutated: calls next() which for retain returns {retain: length} - same value
    // 
    // The key difference: when there's only ONE op and offset=0
    // original: ops.slice(0) = [op]  (1 element)
    // mutated: next() consumes op, ops.slice(1) = [], [next].concat([]) = [processed_op]
    // For retain: next returns {retain: Infinity} if length=Infinity... wait no
    // next(Infinity): length=opLength-offset=opLength, returns {retain: opLength}
    // original op might be {retain: 5}, next returns {retain: 5} - same!
    
    // What about a string insert? next returns substr which equals original
    // What about object retain? next returns the object itself
    // 
    // I think the values ARE the same. The difference must be in iterator state.
    // After rest() with offset=0:
    // original: index and offset unchanged (no next() called)
    // mutated: index and offset restored to original values
    // So state should be same too...
    //
    // Unless: the restore happens AFTER next() changes index
    // In else branch: index is saved, next() increments index, rest slices from new index
    // then index is restored. So state is same.
    //
    // WAIT. What if there are 0 ops left? offset=0, index=ops.length
    // original: ops.slice(ops.length) = []
    // mutated: this.ops[this.index] is undefined, next() returns {retain: Infinity}
    // result: [{retain: Infinity}] vs []  !!!
    
    const ops = [{ insert: "hello" }];
    const iter = new Iterator(ops);
    iter.next(); // consume the only op, now index=1, offset=0
    
    const result = iter.rest();
    // original: ops.slice(1) = []
    // mutated: next() returns {retain: Infinity}, ops.slice(2)=[], result=[{retain:Infinity}]
    expect(result).toEqual([]);
  });
});