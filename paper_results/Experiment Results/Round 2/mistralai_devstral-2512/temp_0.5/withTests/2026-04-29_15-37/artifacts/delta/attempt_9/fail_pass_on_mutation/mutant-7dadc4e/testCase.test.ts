import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embed objects', () => {
  it('should correctly handle null embed data in transform', () => {
    Delta.registerEmbed('test', {
      compose: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => priority ? b : a,
      invert: (a: any, b: any) => b,
    });

    const a = new Delta().retain({ test: { value: 1 } });
    const b = new Delta().retain({ test: null });
    const result = a.transform(b, false);
    const expected = new Delta().retain({ test: { value: 1 } });

    expect(result).toEqual(expected);
    Delta.unregisterEmbed('test');
  });
});