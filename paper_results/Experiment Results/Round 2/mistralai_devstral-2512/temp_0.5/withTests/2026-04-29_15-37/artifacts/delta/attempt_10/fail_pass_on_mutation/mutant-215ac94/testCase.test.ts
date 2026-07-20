import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embeds', () => {
  it('should correctly transform when thisData is a string and otherData is an embed with priority false', () => {
    Delta.registerEmbed<string>('embed', {
      compose: (a, b) => a + b,
      transform: (a, b, priority) => priority ? a : b,
      invert: (a, b) => b,
    });

    const a = new Delta().insert('test');
    const b = new Delta().retain({ embed: 'value' });
    const result = a.transform(b, false);
    const expected = new Delta().retain(4).retain({ embed: 'value' });

    Delta.unregisterEmbed('embed');
    expect(result).toEqual(expected);
  });
});