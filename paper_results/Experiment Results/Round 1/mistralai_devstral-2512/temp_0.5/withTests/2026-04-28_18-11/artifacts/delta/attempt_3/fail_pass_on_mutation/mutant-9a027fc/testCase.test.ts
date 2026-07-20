import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embeds', () => {
  it('should handle retain with number when other has embed', () => {
    Delta.registerEmbed<number>('test', {
      compose: (a, b) => a + b,
      transform: (a, b, priority) => priority ? b : a,
      invert: (a, b) => b - a,
    });

    const a = new Delta().retain(5);
    const b = new Delta().retain({ test: 3 });
    const result = a.transform(b, true);
    const expected = new Delta().retain({ test: 3 });

    Delta.unregisterEmbed('test');

    expect(result).toEqual(expected);
  });
});