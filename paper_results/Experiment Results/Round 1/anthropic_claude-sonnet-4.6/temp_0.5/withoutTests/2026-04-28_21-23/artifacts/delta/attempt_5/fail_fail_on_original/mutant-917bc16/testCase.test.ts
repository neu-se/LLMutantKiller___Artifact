import Delta from "../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('preserves null attributes on insert ops when optimization fires', () => {
    const a = new Delta()
      .retain(1, { bold: true })
      .insert('hello', { bold: null });
    const b = new Delta().retain(1);
    const composed = a.compose(b);
    expect(composed.ops).toEqual([
      { retain: 1, attributes: { bold: true } },
      { insert: 'hello', attributes: { bold: null } },
    ]);
  });
});