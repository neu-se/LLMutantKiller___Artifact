import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embeds', () => {
  it('should correctly handle transformation when thisData is a string and otherData is an embed', () => {
    Delta.registerEmbed<string>('embed', {
      compose: (a, b) => a + b,
      transform: (a, b, priority) => priority ? a : b,
      invert: (a, b) => b,
    });

    const a = new Delta().insert('test');
    const b = new Delta().retain({ embed: 'value' });
    const result = a.transform(b, true);
    const expected = new Delta().retain(4).retain({ embed: 'value' });

    Delta.unregisterEmbed('embed');
    expect(result).toEqual(expected);
  });
});