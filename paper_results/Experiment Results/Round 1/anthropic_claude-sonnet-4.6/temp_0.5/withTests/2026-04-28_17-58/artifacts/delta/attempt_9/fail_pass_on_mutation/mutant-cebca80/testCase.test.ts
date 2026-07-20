import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() mutation detection', () => {
  it('does not run embed handler for numeric retain with attributes', () => {
    Delta.registerEmbed<string>('img', {
      compose: (a, b) => b,
      invert: (a, b) => b,
      transform: (a, b, _priority) => b,
    });

    try {
      // numeric retain with attributes - goes into (op.delete || typeof op.retain === 'number') branch
      // In mutated code, after forEach, the embed handler ALSO runs because
      // } else if (true) { replaces return baseIndex + length
      // This tries getEmbedTypeAndData(op.retain=1, baseOp.insert) where baseOp is 'a'
      // which throws "cannot retain a number"
      const delta = new Delta().retain(1, { bold: true });
      const base = new Delta().insert('a');

      const expected = new Delta().retain(1, { bold: null });
      const inverted = delta.invert(base);

      expect(inverted).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('img');
    }
  });
});