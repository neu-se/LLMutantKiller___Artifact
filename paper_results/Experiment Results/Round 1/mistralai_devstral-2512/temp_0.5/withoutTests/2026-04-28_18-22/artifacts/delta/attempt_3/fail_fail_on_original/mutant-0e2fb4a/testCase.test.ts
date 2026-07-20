import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta invert with object retain', () => {
  it('should correctly invert delta with object retain and attributes', () => {
    Delta.registerEmbed('test', {
      compose: (a, b, keepNull) => keepNull ? a : b,
      invert: (a, b) => a,
      transform: (a, b, priority) => priority ? a : b
    });

    const base = new Delta().insert({ test: 'value' }, { bold: true });
    const delta = new Delta().retain({ test: 'newValue' }, { italic: true });

    const inverted = delta.invert(base);
    const expected = new Delta()
      .retain({ test: 'value' }, { bold: true, italic: null });

    expect(inverted.ops).toEqual(expected.ops);
  });
});