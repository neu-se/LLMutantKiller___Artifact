import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta invert with object retain', () => {
  it('should correctly invert delta with object retain when base has matching embed', () => {
    Delta.registerEmbed('test', {
      compose: (a, b, keepNull) => keepNull ? a : b,
      invert: (a, b) => b,
      transform: (a, b, priority) => priority ? a : b
    });

    const base = new Delta().insert({ test: 'baseValue' });
    const delta = new Delta().retain({ test: 'deltaValue' }, { bold: true });

    const inverted = delta.invert(base);
    const expected = new Delta()
      .retain({ test: 'baseValue' }, { bold: null });

    expect(inverted.ops).toEqual(expected.ops);
  });
});