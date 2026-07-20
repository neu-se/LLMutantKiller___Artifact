import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with leading retain optimization', () => {
  it('should handle insert followed by retain with length exceeding document', () => {
    const a = new Delta().insert('A').insert('B');
    const b = new Delta().retain(5).insert('X');
    const expected = new Delta().insert('A').insert('B').insert('X');
    expect(a.compose(b)).toEqual(expected);
  });
});