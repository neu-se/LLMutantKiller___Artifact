import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embeds', () => {
  it('should correctly transform when thisData is a string and otherData is an embed', () => {
    Delta.registerEmbed<string>('embed', {
      compose: (a, b) => a + b,
      transform: (a, b, priority) => priority ? a : b,
      invert: (b) => b,
    });

    const a = new Delta().insert('Hello');
    const b = new Delta().retain({ embed: 'World' });
    const result = a.transform(b, true);

    Delta.unregisterEmbed('embed');

    expect(result.ops.length).toBe(1);
    expect('retain' in result.ops[0]).toBe(true);
    expect(result.ops[0].retain).toEqual({ embed: 'World' });
  });
});