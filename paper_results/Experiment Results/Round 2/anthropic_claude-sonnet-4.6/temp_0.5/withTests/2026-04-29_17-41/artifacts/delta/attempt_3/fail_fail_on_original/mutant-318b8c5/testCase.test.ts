import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('insert at beginning when other has single op longer than diff insert segment', () => {
    // a = "B", b = "AB"
    // diff strings: "B" vs "AB"
    // diff result: INSERT("A"), EQUAL("B")
    // Processing INSERT("A"): length=1, otherIter.peekLength()=2 (whole "AB" op)
    // Math.min(2,1)=1 -> inserts "A" correctly
    // Math.max(2,1)=2 -> tries to insert "AB" incorrectly
    const a = new Delta().insert('B');
    const b = new Delta().insert('AB');
    
    const expected = new Delta().insert('A').retain(1);
    const result = a.diff(b);
    expect(result).toEqual(expected);
  });
});