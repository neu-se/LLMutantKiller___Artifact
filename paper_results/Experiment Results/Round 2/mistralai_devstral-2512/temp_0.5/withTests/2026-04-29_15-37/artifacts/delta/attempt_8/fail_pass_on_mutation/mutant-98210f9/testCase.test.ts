import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('compose() with embeds', () => {
  it('retain an embed with a number when thisOp has retain', () => {
    Delta.registerEmbed<number>('embed', {
      compose: (a, b) => a + b,
      transform: (a, b, priority) => (priority ? a : b),
      invert: (a, b) => b - a,
    });
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().retain(1, { bold: true });
    const result = a.compose(b);
    expect(result.ops[0].retain).toEqual({ embed: 1 });
    Delta.unregisterEmbed('embed');
  });
});