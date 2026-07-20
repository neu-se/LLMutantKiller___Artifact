import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('applies attributes from retain to preceding inserts when first op has attributes', () => {
    // a has inserts totaling length 2, b starts with retain(2, {italic:true})
    // Original: skips optimization (attributes != null), applies italic to all inserts
    // Mutated: enters optimization block, pushes inserts to ops raw (no italic applied),
    // then consumes the retain from otherIter, so italic never gets applied
    const a = new Delta().insert('A').insert('B');
    const b = new Delta().retain(2, { italic: true });
    const result = a.compose(b);
    const expected = new Delta()
      .insert('A', { italic: true })
      .insert('B', { italic: true });
    expect(result).toEqual(expected);
  });
});