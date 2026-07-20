import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() embed handler keepNull for retain+retain embed', () => {
  it('passes keepNull=true when action is retain (composing retain embed with retain embed)', () => {
    const composeArgs: Array<{ keepNull: boolean }> = [];

    Delta.registerEmbed<{ data: string }>('testemd', {
      compose: (a: { data: string }, b: { data: string }, keepNull: boolean) => {
        composeArgs.push({ keepNull });
        // Return different results based on keepNull to make the output observable
        return keepNull ? { data: 'keepNull-true' } : { data: 'keepNull-false' };
      },
      invert: (_a: { data: string }, b: { data: string }) => b,
      transform: (_a: { data: string }, b: { data: string }, _priority: boolean) => b,
    });

    try {
      // Both a and b retain an embed object - action will be 'retain'
      // Original: keepNull = (action === 'retain') = true
      // Mutated:  keepNull = (action === '') = false
      const a = new Delta().retain({ testemd: { data: 'a' } });
      const b = new Delta().retain({ testemd: { data: 'b' } });
      const result = a.compose(b);

      // In original code, keepNull=true, so compose returns { data: 'keepNull-true' }
      // In mutated code, keepNull=false, so compose returns { data: 'keepNull-false' }
      expect(result.ops[0]).toEqual({ retain: { testemd: { data: 'keepNull-true' } } });
    } finally {
      Delta.unregisterEmbed('testemd');
    }
  });
});