import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() with object retain', () => {
  it('should correctly handle object retain operations with attributes', () => {
    Delta.registerEmbed<{ value: number }>('test', {
      compose: (a, b) => ({ value: a.value + b.value }),
      transform: (a, b, priority) => ({ value: priority ? a.value : b.value }),
      invert: (a, b) => ({ value: b.value - a.value }),
    });

    const base = new Delta().insert({ test: { value: 10 } }, { bold: true });
    const delta = new Delta().retain({ test: { value: 5 } }, { italic: true });
    const inverted = delta.invert(base);

    const expected = new Delta().retain({ test: { value: 5 } }, { italic: null, bold: true });
    expect(inverted).toEqual(expected);

    Delta.unregisterEmbed('test');
  });
});