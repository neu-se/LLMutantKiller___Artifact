import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embeds', () => {
  it('should correctly handle transform when thisData is a number and otherData is an embed', () => {
    Delta.registerEmbed<number>('embed', {
      compose: (a, b) => a + b,
      transform: (a, b, priority) => priority ? a : b,
      invert: (b) => b,
    });

    const a = new Delta().retain(5);
    const b = new Delta().retain({ embed: 10 });
    const result = a.transform(b, true);

    Delta.unregisterEmbed('embed');

    expect(result.ops).toEqual([
      { retain: { embed: 10 } }
    ]);
  });
});