import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly handle object embed data during transform', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (_a: any, b: any) => b,
      invert: (a: any, _b: any) => a,
      transform: (a: any, b: any, priority: boolean) => priority ? a : b,
    });

    const delta1 = new Delta().retain({ test: { key: 'value1' } });
    const delta2 = new Delta().retain({ test: { key: 'value2' } });

    const result = delta1.transform(delta2, true);

    // Verify the transformation produced valid output
    expect(result.ops.length).toBe(1);
    expect('retain' in result.ops[0]).toBe(true);
    if ('retain' in result.ops[0] && typeof result.ops[0].retain === 'object' && result.ops[0].retain !== null) {
      expect('test' in result.ops[0].retain).toBe(true);
      if ('test' in result.ops[0].retain) {
        expect((result.ops[0].retain as any).test).toEqual({ key: 'value1' });
      }
    }

    // Clean up
    Delta.unregisterEmbed('test');
  });
});