import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('compose() with embeds', () => {
  it('retain a string with an embed should throw error', () => {
    Delta.registerEmbed<number>('embed', {
      compose: (a, b) => a + b,
      transform: (a, b, priority) => (priority ? a : b),
      invert: (a, b) => b - a,
    });
    const a = new Delta().insert('a');
    const b = new Delta().retain({ embed: 2 });
    expect(() => {
      a.compose(b);
    }).toThrowError('cannot retain a string');
    Delta.unregisterEmbed('embed');
  });
});