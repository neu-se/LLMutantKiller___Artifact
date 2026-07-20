import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embeds', () => {
  it('should correctly transform retain operations with embed objects', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      invert: (a, b) => b,
      transform: (a, b, priority) => priority ? a : b
    });

    const base = new Delta();
    base.insert({ test: 'A' });

    const delta1 = new Delta();
    delta1.retain({ test: 'B' });

    const delta2 = new Delta();
    delta2.retain({ test: 'C' });

    const result = delta1.transform(delta2, false);
    const expected = new Delta();
    expected.retain({ test: 'C' });

    expect(result.ops).toEqual(expected.ops);
  });
});