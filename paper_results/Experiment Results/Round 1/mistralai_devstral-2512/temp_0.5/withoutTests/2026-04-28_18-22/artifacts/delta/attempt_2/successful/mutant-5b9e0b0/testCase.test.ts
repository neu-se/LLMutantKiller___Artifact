import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose with embeds', () => {
  it('should correctly handle retain embed composition', () => {
    // Register a test embed handler
    Delta.registerEmbed('test', {
      compose: (a, b, keepNull) => ({ composed: a, with: b, keepNull }),
      invert: (a, b) => ({ inverted: a, from: b }),
      transform: (a, b, priority) => ({ transformed: a, by: b, priority }),
    });

    const delta1 = new Delta().retain({ test: { data: 'A' } });
    const delta2 = new Delta().retain({ test: { data: 'B' } });

    const result = delta1.compose(delta2);
    const ops = result.ops;

    expect(ops.length).toBe(1);
    expect(ops[0].retain).toEqual({ test: { composed: { data: 'A' }, with: { data: 'B' }, keepNull: true } });

    // Clean up
    Delta.unregisterEmbed('test');
  });
});