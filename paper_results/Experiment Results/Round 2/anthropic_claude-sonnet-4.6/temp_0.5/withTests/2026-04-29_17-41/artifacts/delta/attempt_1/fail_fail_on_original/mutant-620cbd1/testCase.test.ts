import Delta from "../../src/Delta";

describe('compose() retain start optimization', () => {
  it('correctly composes when other starts with a plain number retain covering leading inserts', () => {
    // This test exercises the "retain start optimization" in compose()
    // where the first op of `other` is a plain number retain (no attributes)
    // The optimization pre-copies insert ops from `this` that fit within the retain
    // Original code: typeof firstOther.retain === 'number' (true for number retains)
    // Mutated code: typeof firstOther.retain === '' (always false, skips optimization)
    // Both should produce the same result, but the mutated code path differs
    // We need a case where the optimization path produces a different result than the non-optimized path

    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .delete(1);
    const b = new Delta().retain(3).insert('D');
    const expected = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .insert('D')
      .delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});