import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta invert with object retain', () => {
  it('should not process object retain when value is null during inversion', () => {
    Delta.registerEmbed('test', {
      compose: (a, b, keepNull) => keepNull ? a : b,
      invert: (a, b) => a,
      transform: (a, b, priority) => priority ? a : b
    });

    const base = new Delta().insert({ test: 'value' });
    const delta = new Delta().retain({ test: null }, { bold: true });

    const inverted = delta.invert(base);
    const expected = new Delta();

    expect(inverted.ops).toEqual(expected.ops);
  });
});