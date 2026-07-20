import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff() INSERT component with Math.min vs Math.max', () => {
  it('correctly diffs when inserted content in other has longer op than diff segment', () => {
    // a = "AC" (two separate ops to create attribute boundaries)
    // b = "ABC" (insert "B" in the middle)
    // The diff will have an EQUAL for "A", INSERT for "B", EQUAL for "C"
    // When processing INSERT "B" (length=1), otherIter.peekLength() for "ABC" op is 3
    // Math.min(3, 1) = 1 (correct), Math.max(3, 1) = 3 (wrong)
    const a = new Delta().insert('A').insert('C');
    const b = new Delta().insert('ABC');
    
    // The expected diff: retain 1, insert 'B', retain 1
    const expected = new Delta().retain(1).insert('B').retain(1);
    const result = a.diff(b);
    expect(result).toEqual(expected);
  });
});