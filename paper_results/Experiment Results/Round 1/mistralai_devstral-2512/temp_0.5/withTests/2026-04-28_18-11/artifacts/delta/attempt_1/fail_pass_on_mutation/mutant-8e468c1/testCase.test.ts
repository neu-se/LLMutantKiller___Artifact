import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with leading retain optimization', () => {
  it('should handle insert followed by retain correctly', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(1).insert('X');
    const expected = new Delta().insert('AX').insert('B').insert('C');
    expect(a.compose(b)).toEqual(expected);
  });
});