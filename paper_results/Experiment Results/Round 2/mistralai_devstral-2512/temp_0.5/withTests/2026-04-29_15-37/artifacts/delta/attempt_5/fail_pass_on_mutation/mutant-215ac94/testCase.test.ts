import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embeds', () => {
  it('should correctly transform when thisData is a number and otherData is an embed', () => {
    Delta.registerEmbed<number>('embed', {
      compose: (a, b) => a + b,
      transform: (a, b, priority) => priority ? a : b,
      invert: (a, b) => b - a,
    });

    const a = new Delta().retain(5);
    const b = new Delta().retain({ embed: 10 });
    const result = a.transform(b, true);
    const expected = new Delta().retain({ embed: 10 });

    Delta.unregisterEmbed('embed');
    expect(result).toEqual(expected);
  });
});