import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should handle retain optimization when firstOther has numeric retain without attributes', () => {
    const a = new Delta().insert('A', { bold: true }).insert('B').insert('C', { bold: true });
    const b = new Delta().retain(3);
    const expected = new Delta().insert('A', { bold: true }).insert('B').insert('C', { bold: true });
    const result = a.compose(b);
    expect(result).toEqual(expected);
    // Additional check to ensure the optimization path was taken
    expect(result.ops.length).toBe(3);
  });
});