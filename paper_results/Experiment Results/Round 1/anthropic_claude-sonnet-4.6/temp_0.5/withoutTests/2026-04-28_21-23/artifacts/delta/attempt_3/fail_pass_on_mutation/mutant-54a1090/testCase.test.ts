import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should apply attributes from other retain over existing inserts', () => {
    const a = new Delta().insert('Hello');
    const b = new Delta().retain(5, { bold: true });
    const result = a.compose(b);
    expect(result).toEqual(new Delta().insert('Hello', { bold: true }));
  });
});