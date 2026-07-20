import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embeds', () => {
  it('should throw error when transforming string with embed retain', () => {
    Delta.registerEmbed<string>('embed', {
      compose: (a, b) => a + b,
      transform: (a, b, priority) => priority ? a : b,
      invert: (a, b) => b,
    });

    const a = new Delta().insert('test');
    const b = new Delta().retain({ embed: 'value' });

    expect(() => {
      a.transform(b, true);
    }).toThrow('cannot retain a string');

    Delta.unregisterEmbed('embed');
  });
});