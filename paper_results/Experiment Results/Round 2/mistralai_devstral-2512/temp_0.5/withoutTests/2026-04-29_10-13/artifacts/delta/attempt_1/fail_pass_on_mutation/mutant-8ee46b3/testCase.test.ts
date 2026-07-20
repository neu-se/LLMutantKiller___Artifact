import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embeds', () => {
  it('should correctly transform embeds when both operations have embed data', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      invert: (a, b) => b,
      transform: (a, b) => b
    });

    const base = new Delta().insert({ test: 'A' });
    const delta1 = new Delta().retain({ test: 'B' });
    const delta2 = new Delta().retain({ test: 'C' });

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain({ test: 'C' });

    expect(result.ops).toEqual(expected.ops);
  });
});