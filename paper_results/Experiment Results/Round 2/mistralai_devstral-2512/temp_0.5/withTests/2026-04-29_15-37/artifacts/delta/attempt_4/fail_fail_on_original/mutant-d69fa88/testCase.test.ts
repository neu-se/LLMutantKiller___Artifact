import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() with embed retain', () => {
  it('should correctly handle object retain with attributes', () => {
    Delta.registerEmbed<number>('test', {
      compose: (a, b) => a + b,
      transform: (a, b, priority) => priority ? a : b,
      invert: (a, b) => b - a,
    });

    const delta = new Delta().retain({ test: 5 }, { bold: true });
    const base = new Delta().insert({ test: 10 }, { italic: true });
    const inverted = delta.invert(base);

    const expected = new Delta().retain({ test: 5 }, { bold: null, italic: true });
    expect(inverted).toEqual(expected);

    Delta.unregisterEmbed('test');
  });
});