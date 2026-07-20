import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embeds', () => {
  it('should handle retain with embed when other has null embed', () => {
    Delta.registerEmbed<number>('test', {
      compose: (a, b) => a + b,
      transform: (a, b, priority) => priority ? b : a,
      invert: (a, b) => b - a,
    });

    const a = new Delta().retain({ test: 5 });
    const b = new Delta().retain({ test: null });
    const result = a.transform(b, true);
    const expected = new Delta().retain(5);

    Delta.unregisterEmbed('test');

    expect(result).toEqual(expected);
  });
});