import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization with attributed retain as first other op', () => {
    const a = new Delta().insert('A').insert('B');
    const b = new Delta().retain(2, { italic: true });
    const result = a.compose(b);
    // Original: italic is applied to both inserts
    // Mutated: optimization block runs, inserts are pushed raw without italic,
    // then the retain is consumed from otherIter, so italic is never applied
    expect(result.ops).toEqual([
      { insert: 'AB', attributes: { italic: true } },
    ]);
  });
});