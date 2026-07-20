import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain embed thisOp', () => {
  it('retain embed composed with retain embed preserves retain in output', () => {
    Delta.registerEmbed('widget', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => {
        // Return something distinguishable based on keepNull
        return keepNull ? { kept: true } : { kept: false };
      },
      transform: (_a: unknown, _b: unknown, _priority: boolean) => ({}),
      invert: (_a: unknown, _b: unknown) => ({}),
    });

    try {
      // Build a document with a retain embed op
      // a: retain({widget:{x:1}}) - thisOp will be retain embed
      // b: retain({widget:{x:2}}) - otherOp will be retain embed
      // Original: action='retain', keepNull=true -> {kept:true}
      // Mutated:  action='insert', keepNull=false -> {kept:false}
      const a = new Delta().retain({ widget: { x: 1 } });
      const b = new Delta().retain({ widget: { x: 2 } });

      const result = a.compose(b);

      expect(result.ops).toHaveLength(1);
      // Original produces retain with {kept:true}
      // Mutated produces insert with {kept:false}
      expect(result.ops[0].retain).toEqual({ widget: { kept: true } });
    } finally {
      Delta.unregisterEmbed('widget');
    }
  });
});