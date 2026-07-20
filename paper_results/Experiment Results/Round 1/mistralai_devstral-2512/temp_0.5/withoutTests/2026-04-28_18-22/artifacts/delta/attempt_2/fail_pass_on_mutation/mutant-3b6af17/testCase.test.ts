import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embeds', () => {
  it('should handle non-object retain data correctly', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      invert: (a, b) => b,
      transform: (a, b, priority) => priority ? b : a
    });

    const delta1 = new Delta().retain(5);
    const delta2 = new Delta().retain({ test: 'value' });

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain({ test: 'value' });

    expect(result.ops).toEqual(expected.ops);
  });
});