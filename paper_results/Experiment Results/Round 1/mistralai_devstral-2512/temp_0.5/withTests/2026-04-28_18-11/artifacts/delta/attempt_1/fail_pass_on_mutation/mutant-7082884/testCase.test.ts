import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('should return empty delta when comparing identical ops arrays', () => {
    const a = new Delta().insert('A').insert('B', { bold: true });
    const b = new Delta(a.ops); // Create a new Delta with the same ops array
    const result = a.diff(b);
    expect(result.ops).toEqual([]);
  });
});