import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embed objects', () => {
  it('should correctly handle null embed data in transform', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      transform: (a, b, priority) => priority ? b : a,
      invert: (a, b) => b,
    });

    const a = new Delta().retain({ test: null });
    const b = new Delta().retain(5);
    const result = a.transform(b, true);
    const expected = new Delta().retain(5);

    expect(result).toEqual(expected);

    Delta.unregisterEmbed('test');
  });
});