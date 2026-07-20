import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embeds', () => {
  it('should use registered handler for embed transforms', () => {
    // Register a handler that returns a predictable value
    const testHandler = {
      compose: (a: number, b: number) => a + b,
      invert: (a: number, b: number) => b - a,
      transform: (a: number, b: number, priority: boolean) => priority ? a : b
    };
    Delta.registerEmbed('test', testHandler);

    const delta1 = new Delta().retain({ test: 5 });
    const delta2 = new Delta().retain({ test: 3 });

    const result = delta1.transform(delta2, true);

    // With original code, handler should be used (5 due to priority)
    // With mutated code, handler might not be used (could get different result)
    expect(result.ops).toEqual([{ retain: { test: 5 } }]);

    Delta.unregisterEmbed('test');
  });
});