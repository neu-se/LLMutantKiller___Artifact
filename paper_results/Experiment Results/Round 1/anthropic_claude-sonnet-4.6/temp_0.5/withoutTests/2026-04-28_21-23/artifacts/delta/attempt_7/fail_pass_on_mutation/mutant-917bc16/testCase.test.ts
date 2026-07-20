import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('correctly composes when other has single retain and this has many remaining ops', () => {
    const a = new Delta()
      .retain(1, { bold: true })
      .insert('A')
      .insert('B')  // These won't merge due to... wait, they will merge
      .delete(1)
      .retain(2);
    const b = new Delta().retain(1);
    const result = a.compose(b);
    // After composing, the result should have the retain with bold,
    // then the insert 'AB', then the delete, then chop removes trailing retain
    expect(result.ops).toEqual([
      { retain: 1, attributes: { bold: true } },
      { insert: 'AB' },
      { delete: 1 },
    ]);
  });
});