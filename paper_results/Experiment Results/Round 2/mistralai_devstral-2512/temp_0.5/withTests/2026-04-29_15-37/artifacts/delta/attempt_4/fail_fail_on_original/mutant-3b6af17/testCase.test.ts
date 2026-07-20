import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embeds', () => {
  it('should correctly transform when thisData is a string and otherData is an embed', () => {
    Delta.registerEmbed<string>('embed', {
      compose: (a, b) => a + b,
      transform: (a, b, priority) => priority ? a : b,
      invert: (a, b) => b,
    });

    const a = new Delta().insert('Hello');
    const b = new Delta().retain({ embed: 'World' });
    const result = a.transform(b, true);

    Delta.unregisterEmbed('embed');

    expect(result.ops).toHaveLength(1);
    expect(result.ops[0]).toHaveProperty('retain');
    expect(result.ops[0].retain).toEqual({ embed: 'World' });
  });
});