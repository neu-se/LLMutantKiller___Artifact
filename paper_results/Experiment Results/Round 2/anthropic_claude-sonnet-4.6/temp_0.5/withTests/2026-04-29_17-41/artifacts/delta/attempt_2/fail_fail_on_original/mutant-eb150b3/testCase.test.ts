import Delta from "../../../../../../../../../../../../../src/Delta";

describe('compose() with embed handler keepNull parameter', () => {
  it('passes keepNull=false when action is insert (thisOp is insert embed, otherOp is embed retain)', () => {
    // Register a handler that returns different results based on keepNull
    Delta.registerEmbed<{ value: string; nullField?: string | null }>('testEmbed', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => {
        const aObj = a as { value: string };
        const bObj = b as { value: string };
        const result: { value: string; nullField?: string | null } = {
          value: aObj.value + bObj.value,
        };
        if (keepNull) {
          result.nullField = null;
        }
        return result;
      },
      invert: (_a: unknown, b: unknown) => b as { value: string },
      transform: (_a: unknown, b: unknown, _priority: boolean) => b as { value: string },
    });

    try {
      // thisOp is an insert embed -> action = 'insert'
      // Original: keepNull = (action === 'retain') = false -> nullField NOT added
      // Mutated:  keepNull = (action !== 'retain') = true  -> nullField IS added (null)
      const a = new Delta().insert({ testEmbed: { value: 'hello' } });
      const b = new Delta().retain({ testEmbed: { value: 'world' } });

      const result = a.compose(b);

      // With original code (keepNull=false), nullField should NOT be present
      expect(result.ops[0].insert).toEqual({ testEmbed: { value: 'helloworld' } });
    } finally {
      Delta.unregisterEmbed('testEmbed');
    }
  });
});