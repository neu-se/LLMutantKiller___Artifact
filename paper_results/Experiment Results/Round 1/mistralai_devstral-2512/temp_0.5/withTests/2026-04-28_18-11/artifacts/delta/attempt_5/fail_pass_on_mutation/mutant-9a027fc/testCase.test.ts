import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embeds', () => {
  it('should handle retain with embed when other has embed of different type', () => {
    Delta.registerEmbed<number>('test1', {
      compose: (a, b) => a + b,
      transform: (a, b, priority) => priority ? b : a,
      invert: (a, b) => b - a,
    });

    Delta.registerEmbed<string>('test2', {
      compose: (a, b) => a + b,
      transform: (a, b, priority) => priority ? b : a,
      invert: (a, b) => b.replace(a, ''),
    });

    const a = new Delta().retain({ test1: 5 });
    const b = new Delta().retain({ test2: 'hello' });
    const result = a.transform(b, true);
    const expected = new Delta().retain({ test2: 'hello' });

    Delta.unregisterEmbed('test1');
    Delta.unregisterEmbed('test2');

    expect(result).toEqual(expected);
  });
});