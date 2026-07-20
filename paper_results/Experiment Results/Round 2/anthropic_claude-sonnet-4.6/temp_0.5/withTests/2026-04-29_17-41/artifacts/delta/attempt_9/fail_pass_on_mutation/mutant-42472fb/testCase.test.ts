import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization: only inserts in this, other is only a retain', () => {
    // When b is ONLY a retain covering all inserts in a,
    // original: ops pre-populated, otherIter exhausted, main loop never runs
    // mutated: main loop runs, processes retain against inserts
    // Both should give same result... unless thisIter has more after inserts
    // Let's use: a = insert(A) + insert(B,bold), b = retain(1)
    // Original: ops=[A], otherIter advanced by 1 (exhausted since retain(1) fully consumed)
    // Main loop: thisIter=insert(B,bold), otherIter exhausted -> loop runs
    // otherIter.peekType()='retain'(infinity), thisIter.peekType()='insert'
    // -> else branch: length=min(1,inf)=1, thisOp=insert(B,bold), otherOp=retain(inf)
    // otherOp.retain=inf (truthy), thisOp.retain==null -> newOp.insert=B_bold
    // attributes=compose(bold,undefined,false)=bold -> push insert(B,bold)
    // early return: !otherIter.hasNext()=true, isEqual(delta.ops.last, newOp)?
    // delta.ops=[A, B_bold], last={insert:B,attributes:{bold:true}}, newOp={insert:B,attributes:{bold:true}} -> YES
    // rest = thisIter.rest() = [] -> delta.concat([]).chop() = [A, B_bold]
    // Mutated: main loop: retain(1) vs insert(A) -> insert(A). early return: otherIter exhausted,
    // isEqual({insert:A},{insert:A})? YES -> rest=thisIter.rest()=[insert(B,bold)]
    // delta.concat([insert(B,bold)]).chop() = [A, B_bold]. Same!
    const a = new Delta().insert('A').insert('B', { bold: true });
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A').insert('B', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});