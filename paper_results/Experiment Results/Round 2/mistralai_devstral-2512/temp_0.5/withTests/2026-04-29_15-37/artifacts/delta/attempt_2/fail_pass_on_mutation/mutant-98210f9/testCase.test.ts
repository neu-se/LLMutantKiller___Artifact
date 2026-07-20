import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('compose() with embeds', () => {
  it('retain an embed with another embed', () => {
    Delta.registerEmbed<number>('embed', {
      compose: (a, b) => a + b,
      transform: (a, b, priority) => (priority ? a : b),
      invert: (a, b) => b - a,
    });
    const a = new Delta().insert({ embed: 1 });
    const b = new Delta().retain({ embed: 2 });
    const expected = new Delta().insert({ embed: 3 });
    expect(a.compose(b)).toEqual(expected);
    Delta.unregisterEmbed('embed');
  });
});