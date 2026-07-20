import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should not apply optimization when other starts with an object retain', () => {
    Delta.registerEmbed('image', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown, _priority: boolean) => b,
    });
    try {
      const a = new Delta().insert('hello').insert({ image: { src: 'a.png' } });
      const b = new Delta().retain({ image: { src: 'b.png' } });
      const result = a.compose(b);
      expect(result.ops).toEqual([
        { insert: 'hello' },
        { insert: { image: { src: 'b.png' } } },
      ]);
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});