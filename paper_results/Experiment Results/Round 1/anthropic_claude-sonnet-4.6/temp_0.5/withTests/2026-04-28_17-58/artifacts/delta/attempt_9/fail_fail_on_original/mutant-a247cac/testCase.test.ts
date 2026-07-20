import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('simple case to test optimization condition', () => {
    // a has retain(5), insert('Hello')
    // b has retain(3), insert('X')
    // Top optimization: firstOther=retain(3), no attrs
    // firstLeft=3, thisIter: retain(5) peekLength=5 > 3, loop doesn't push
    // otherIter.next(3) - consume 3 of retain
    // delta=[]
    // Main loop:
    // otherIter has retain(2) remaining, then insert('X')
    // Pair: retain(5) + retain(2) -> length=2, thisOp=retain(2), otherOp=retain(2)
    //   newOp={retain:2}, push -> delta=[{retain:2}]
    //   isEqual({retain:2},{retain:2}) -> TRUE? fires?
    //   rest=[retain(3),insert('Hello')]
    //   concat: push retain(3) -> merges -> {retain:5}
    //   raw concat insert('Hello') -> [{retain:5},{insert:'Hello'}]
    //   chop: retain(5) not last... insert is last, no chop
    //   return [{retain:5},{insert:'Hello'}]
    // 
    // But otherIter still has insert('X')! Skipped by optimization.
    // 
    // Mutated: no optimization
    // otherIter has insert('X') next
    // push insert('X') -> [{retain:2},{insert:'X'}]
    // then thisIter has retain(3),insert('Hello')
    // retain(3)+retain(Inf) -> {retain:3}, push -> merges -> {retain:5}... wait
    // Actually after insert('X') is pushed, otherIter is exhausted
    // retain(3)+retain(Inf) -> {retain:3}, push -> [{retain:2},{insert:'X'},{retain:3}]
    // insert('Hello')+retain(Inf) -> {insert:'Hello'}, push -> [{retain:2},{insert:'X'},{retain:3},{insert:'Hello'}]
    // chop: last is insert, no chop
    // Result: [{retain:2},{insert:'X'},{retain:3},{insert:'Hello'}]
    //
    // Original: [{retain:5},{insert:'Hello'}]
    // Mutated: [{retain:2},{insert:'X'},{retain:3},{insert:'Hello'}]
    // DIFFERENT!
    
    const a = new Delta().retain(5).insert('Hello');
    const b = new Delta().retain(3).insert('X');
    const expected = new Delta().retain(5).insert('Hello');
    expect(a.compose(b)).toEqual(expected);
  });
});