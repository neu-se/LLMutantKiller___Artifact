import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() mutation detection', () => {
  it('detects mutation by observing keepNull parameter passed to handler', () => {
    const keepNullValues: boolean[] = [];

    Delta.registerEmbed('test', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => {
        keepNullValues.push(keepNull);
        return { result: 1 };
      },
      transform: (_a: unknown, _b: unknown, _priority: boolean) => ({ result: 1 }),
      invert: (_a: unknown, _b: unknown) => ({ result: 1 }),
    });

    try {
      // Use insert embed in 'a' (thisOp.retain == null -> true)
      // and retain embed in 'b' (otherOp.retain is object)
      // Both original and mutated: action='insert', keepNull=false
      // This confirms the branch IS reached for insert+retain_embed case

      // Now use retain embed in 'a' (thisOp.retain is object, not null)
      // and retain embed in 'b' (otherOp.retain is object)
      // Original: action='retain', keepNull=true
      // Mutated: action='insert', keepNull=false
      const a = new Delta().retain({ test: { v: 1 } });
      const b = new Delta().retain({ test: { v: 2 } });

      keepNullValues.length = 0;
      a.compose(b);

      // Original passes keepNull=true, mutated passes keepNull=false
      expect(keepNullValues).toEqual([true]);
    } finally {
      Delta.unregisterEmbed('test');
    }
  });
});