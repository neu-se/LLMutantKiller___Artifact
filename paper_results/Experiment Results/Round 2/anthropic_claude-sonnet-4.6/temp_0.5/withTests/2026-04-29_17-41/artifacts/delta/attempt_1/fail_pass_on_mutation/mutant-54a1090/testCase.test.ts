import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('compose() with leading retain optimization', () => {
  it('should correctly compose when this starts with insert and other starts with retain covering it', () => {
    // 'this' has an insert 'A' followed by more content
    // 'other' starts with a retain that covers the insert in 'this'
    // The original code uses the optimization path where thisIter.peekType() === 'insert'
    // and thisIter.peekLength() <= firstLeft to push inserts directly
    const a = new Delta().insert('A').insert('B');
    const b = new Delta().retain(2).insert('C');
    // After composing: 'A', 'B' are retained (kept), then 'C' is inserted
    const expected = new Delta().insert('A').insert('B').insert('C');
    expect(a.compose(b)).toEqual(expected);
  });
});