import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('correctly handles insert when other op is longer than diff segment', () => {
    // a = "AC" with different attributes so ops stay separate
    // b = "ABC" where "AB" has bold and "C" is plain
    // diff string: a="AC", b="ABC"
    // diff result: EQUAL("A"), INSERT("B"), EQUAL("C")
    // When processing INSERT("B"), length=1, otherIter is at "AB"(bold) op with peekLength=2
    // Math.min(2,1)=1 correct; Math.max(2,1)=2 wrong (consumes too much)
    const a = new Delta().insert('A').insert('C', { bold: true });
    const b = new Delta().insert('AB', { bold: true }).insert('C');
    
    // Expected: retain 1, insert 'B' with bold, retain 1 with bold:null
    const expected = new Delta()
      .retain(1)
      .insert('B', { bold: true })
      .retain(1, { bold: null });
    
    const result = a.diff(b);
    expect(result).toEqual(expected);
  });
});