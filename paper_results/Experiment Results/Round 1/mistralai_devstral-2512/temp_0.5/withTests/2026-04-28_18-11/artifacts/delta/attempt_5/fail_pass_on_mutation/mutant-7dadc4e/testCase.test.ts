import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embed objects', () => {
  it('should correctly handle null vs object embed data in transform', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => a,
      transform: (a, b, priority) => priority ? b : a,
      invert: (a, b) => a,
    });

    const a = new Delta().retain({ test: null });
    const b = new Delta().retain({ test: { value: 1 } });
    const result = a.transform(b, true);
    const expected = new Delta().retain({ test: { value: 1 } });

    expect(result).toEqual(expected);

    Delta.unregisterEmbed('test');
  });
});