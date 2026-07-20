import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embeds', () => {
  it('should correctly transform embeds when thisData is null', () => {
    // Register a simple embed handler
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      invert: (a, b) => a,
      transform: (a, b, priority) => priority ? a : b,
    });

    const delta1 = new Delta().retain({ test: null });
    const delta2 = new Delta().retain({ test: { value: 'test' } });

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain({ test: { value: 'test' } });

    expect(result.ops).toEqual(expected.ops);
  });
});