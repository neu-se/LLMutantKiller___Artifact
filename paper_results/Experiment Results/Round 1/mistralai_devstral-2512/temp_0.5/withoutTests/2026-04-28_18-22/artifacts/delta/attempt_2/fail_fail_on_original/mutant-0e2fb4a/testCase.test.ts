import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta invert with object retain', () => {
  it('should correctly handle null object retain during inversion', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      invert: (a, b) => a,
      transform: (a, b, priority) => priority ? a : b
    });

    const base = new Delta().insert({ test: 'value' });
    const delta = new Delta().retain({ test: null });

    const inverted = delta.invert(base);
    const expected = new Delta();

    expect(inverted.ops).toEqual(expected.ops);
  });
});