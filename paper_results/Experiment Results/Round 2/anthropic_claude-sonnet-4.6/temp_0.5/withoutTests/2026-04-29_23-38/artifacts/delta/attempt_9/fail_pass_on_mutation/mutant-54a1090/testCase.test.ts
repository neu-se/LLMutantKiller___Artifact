import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta compose', () => {
  it('compose with this having two differently-attributed inserts and other having plain retain then delete', () => {
    const a = new Delta().insert('A', { bold: true }).insert('B', { italic: true });
    const b = new Delta().retain(1).delete(1);
    const result = a.compose(b);
    // Should keep A(bold) and delete B(italic)
    expect(result.ops).toEqual([{ insert: 'A', attributes: { bold: true } }]);
  });
});