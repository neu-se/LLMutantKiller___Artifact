import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('composing object retain with object retain produces a retain op not an empty-key op', () => {
    Delta.registerEmbed('delta', {
      compose: (a: unknown, b: unknown) =>
        new Delta(a as { insert: string }[]).compose(new Delta(b as { insert: string }[])).ops,
      transform: (a: unknown, b: unknown, priority: boolean) =>
        new Delta(a as { insert: string }[]).transform(new Delta(b as { insert: string }[]), priority).ops,
      invert: (a: unknown, b: unknown) =>
        new Delta(a as { insert: string }[]).invert(new Delta(b as { insert: string }[])).ops,
    });

    try {
      // a has object retain, b has object retain
      // thisOp.retain is an object (not null) → original: action='retain', mutated: action=''
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });

      const result = a.compose(b);

      // Original: newOp.retain = { delta: [...] } → op has 'retain' key
      // Mutated:  newOp[''] = { delta: [...] }    → op has '' key, no 'retain'
      expect(Object.keys(result.ops[0])).toContain('retain');
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});