import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embeds', () => {
  it('should use handler when available for embed transforms', () => {
    // Register a handler that modifies the data
    const testHandler = {
      compose: (a: number, b: number) => a + b,
      invert: (a: number, b: number) => b - a,
      transform: (a: number, b: number, priority: boolean) => priority ? a * 2 : b * 2
    };
    Delta.registerEmbed('test', testHandler);

    const delta1 = new Delta().retain({ test: 5 });
    const delta2 = new Delta().retain({ test: 3 });

    const result = delta1.transform(delta2, true);

    // With original code, handler should be used (5 * 2 = 10)
    // With mutated code, handler might not be used (could get different result)
    expect(result.ops).toEqual([{ retain: { test: 10 } }]);

    Delta.unregisterEmbed('test');
  });
});