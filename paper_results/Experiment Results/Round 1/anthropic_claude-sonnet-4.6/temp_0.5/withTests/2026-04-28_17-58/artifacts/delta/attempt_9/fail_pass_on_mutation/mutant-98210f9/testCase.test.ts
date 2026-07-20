import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose with retain embed', () => {
  it('composing retain-embed with retain-embed: result retain key differs from insert key in op structure', () => {
    const composeCallArgs: Array<[unknown, unknown, boolean]> = [];
    
    Delta.registerEmbed('e', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => {
        composeCallArgs.push([a, b, keepNull]);
        return b;
      },
      transform: (a: unknown, b: unknown, priority: boolean) => b,
      invert: (a: unknown, b: unknown) => a,
    });

    try {
      const a = new Delta().retain({ e: 1 });
      const b = new Delta().retain({ e: 2 });
      const composed = a.compose(b);

      // Original: action='retain', keepNull = (action==='retain') = true
      // Mutated:  action='insert', keepNull = (action==='retain') = false
      expect(composeCallArgs.length).toBe(1);
      // keepNull should be true when composing two retains (not inserts)
      expect(composeCallArgs[0][2]).toBe(true);
    } finally {
      Delta.unregisterEmbed('e');
    }
  });
});