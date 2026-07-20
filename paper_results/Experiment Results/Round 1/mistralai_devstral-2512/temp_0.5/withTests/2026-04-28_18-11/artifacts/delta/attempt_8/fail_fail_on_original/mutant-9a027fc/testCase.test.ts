import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embeds', () => {
  it('should handle retain with embed when other has number with priority false', () => {
    Delta.registerEmbed<number>('test', {
      compose: (a, b) => a + b,
      transform: (a, b, priority) => priority ? b : a,
      invert: (a, b) => b - a,
    });

    const a = new Delta().retain({ test: 5 });
    const b = new Delta().retain(3);
    const result = a.transform(b, false);
    const expected = new Delta().retain({ test: 5 });

    Delta.unregisterEmbed('test');

    expect(result).toEqual(expected);
  });
});