import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('transform() with embeds', () => {
  it('should handle embed transformation correctly when thisData is not an object', () => {
    Delta.registerEmbed<number>('test', {
      compose: (a, b) => a + b,
      transform: (a, b, priority) => priority ? a : b,
      invert: (a, b) => b - a,
    });

    const a = new Delta().retain(5);
    const b = new Delta().retain({ test: 10 });
    const result = a.transform(b, true);
    const expected = new Delta().retain({ test: 10 });

    Delta.unregisterEmbed('test');
    expect(result).toEqual(expected);
  });
});