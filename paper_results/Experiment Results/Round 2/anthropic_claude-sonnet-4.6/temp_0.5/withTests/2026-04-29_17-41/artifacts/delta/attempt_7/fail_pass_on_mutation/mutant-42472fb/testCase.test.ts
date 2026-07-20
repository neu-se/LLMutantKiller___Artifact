import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization partial: insert then retain-with-attrs, other has larger retain', () => {
    // Original: ops=[insert(A)], firstLeft=2, otherIter advanced by 1, remaining retain(2) in otherIter
    // Main loop: thisIter=retain(2,bold), otherIter=retain(2)
    // → newOp={retain:2}, attributes=compose(bold,undefined,true)=bold → retain(2,bold)
    // Result: insert(A).retain(2,bold) → chop keeps retain(2,bold) since it has attributes
    // Mutated: main loop: otherIter=retain(3), thisIter=insert(A)
    // length=1, thisOp=insert(A), otherOp=retain(1) → insert(A)
    // then thisIter=retain(2,bold), otherIter=retain(2)
    // → retain(2,bold). Result: insert(A).retain(2,bold). Same!
    const a = new Delta().insert('A').retain(2, { bold: true });
    const b = new Delta().retain(3);
    const expected = new Delta().insert('A').retain(2, { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});