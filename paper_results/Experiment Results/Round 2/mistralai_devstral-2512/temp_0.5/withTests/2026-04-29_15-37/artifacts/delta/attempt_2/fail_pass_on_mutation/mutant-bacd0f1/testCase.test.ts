import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embeds', () => {
  it('should correctly handle object vs null embed data', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      transform: (a, b, priority) => priority ? b : a,
      invert: (a, b) => b,
    });

    const a = new Delta().retain({ test: { value: 1 } });
    const b = new Delta().retain({ test: null });
    const result = a.transform(b, true);
    const expected = new Delta().retain({ test: null });
    expect(result).toEqual(expected);

    Delta.unregisterEmbed('test');
  });
});