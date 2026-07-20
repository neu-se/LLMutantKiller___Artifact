import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embeds', () => {
  it('should correctly handle mixed retain types during transform', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      invert: (a, b) => b,
      transform: (a, b, priority) => priority ? b : a
    });

    const delta1 = new Delta().retain({ test: 'value1' });
    const delta2 = new Delta().retain(3);

    const result = delta1.transform(delta2, false);
    const expected = new Delta().retain({ test: 'value1' });

    expect(result.ops).toEqual(expected.ops);
  });
});