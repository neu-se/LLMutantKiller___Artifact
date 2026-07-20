import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta invert with object retain', () => {
  it('should correctly handle object retain with null value during inversion', () => {
    Delta.registerEmbed('test', {
      compose: (a, b, keepNull) => keepNull ? a : b,
      invert: (a, b) => a,
      transform: (a, b, priority) => priority ? a : b
    });

    const base = new Delta().insert({ test: null });
    const delta = new Delta().retain({ test: 'value' }, { bold: true });

    const inverted = delta.invert(base);
    const expected = new Delta()
      .retain({ test: null }, { bold: null });

    expect(inverted.ops).toEqual(expected.ops);
  });
});