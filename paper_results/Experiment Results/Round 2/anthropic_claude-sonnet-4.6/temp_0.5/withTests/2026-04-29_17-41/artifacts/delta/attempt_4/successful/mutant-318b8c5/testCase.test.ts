import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('correctly diffs insert in middle of single op', () => {
    // a = "AC" as single op, b = "ABC" as single op
    // diff strings: "AC" vs "ABC"
    // diff: EQUAL("A"), INSERT("B"), EQUAL("C")
    // During INSERT("B"): length=1, otherIter.peekLength()=2 (remaining "BC" of "ABC" op)
    // Math.min(2,1)=1 -> push insert "B" correctly
    // Math.max(2,1)=2 -> push insert "BC" incorrectly, then EQUAL("C") fails
    const a = new Delta().insert('AC');
    const b = new Delta().insert('ABC');
    
    // After chop: just insert('B') retain(1) -> but diff chops trailing retains
    // So expected is just insert('B') with retain(1) chopped away
    const expected = new Delta().retain(1).insert('B');
    const result = a.diff(b);
    expect(result).toEqual(expected);
  });
});