import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose with embeds', () => {
  it('should correctly handle retain action in compose with embeds', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a, b, keepNull) => {
        if (keepNull) return a;
        return b;
      },
      invert: (a, b) => b,
      transform: (a, b) => b
    });

    const delta1 = new Delta().retain({ test: 'value1' });
    const delta2 = new Delta().retain({ test: 'value2' });

    const result = delta1.compose(delta2);
    const expectedOps = [{ retain: { test: 'value1' } }];

    expect(result.ops).toEqual(expectedOps);
  });
});