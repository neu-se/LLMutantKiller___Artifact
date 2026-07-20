import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embed objects', () => {
  it('should correctly handle null embed data in transform', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      transform: (a, b, priority) => priority ? b : a,
      invert: (a, b) => b,
    });

    const a = new Delta().retain({ test: { value: 1 } });
    const b = new Delta().retain({ test: null });
    const result = a.transform(b, true);
    const expected = new Delta().retain({ test: null });

    expect(result.ops.length).toBe(1);
    expect(result.ops[0]).toHaveProperty('retain');
    expect(result.ops[0].retain).toBeNull();
    Delta.unregisterEmbed('test');
  });
});