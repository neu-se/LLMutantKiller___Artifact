import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embeds', () => {
  it('should correctly transform embeds when handler is registered', () => {
    // Register a handler that returns a specific value
    const testHandler = {
      compose: (a: number, b: number) => a + b,
      invert: (a: number, b: number) => b - a,
      transform: (a: number, b: number, priority: boolean) => 42
    };
    Delta.registerEmbed('test', testHandler);

    const delta1 = new Delta().retain({ test: 5 });
    const delta2 = new Delta().retain({ test: 3 });

    const result = delta1.transform(delta2, true);

    // With original code, handler should be used and return 42
    // With mutated code, the handler might not be called properly
    expect(result.ops).toEqual([{ retain: { test: 42 } }]);

    Delta.unregisterEmbed('test');
  });
});