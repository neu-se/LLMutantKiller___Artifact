import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('correctly computes diff when insert component length is less than otherIter peekLength', () => {
    // a = "AC" (two separate ops to control iterator behavior)
    // b = "ABC" 
    // diff("AC", "ABC") => EQUAL "A", INSERT "B", EQUAL "C"
    // During INSERT "B": length=1, otherIter has op "ABC" with peekLength remaining
    // After consuming "A" from otherIter, it still has "BC" (peekLength=2)
    // Math.min(2, 1) = 1 (correct, takes just "B")
    // Math.max(2, 1) = 2 (wrong, takes "BC", skipping "C" in EQUAL)
    const a = new Delta().insert('AC');
    const b = new Delta().insert('ABC');
    const result = a.diff(b);
    // Expected: retain 1 (A), insert 'B', retain 1 (C)
    // After chop: retain 1, insert 'B'
    const expected = new Delta().retain(1).insert('B');
    expect(result).toEqual(expected);
  });
});