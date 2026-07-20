import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should correctly transform embed retains using registered handler', () => {
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => priority ? a : b,
    });

    const a = new Delta().retain({ image: { src: 'a.png' } });
    const b = new Delta().retain({ image: { src: 'b.png' } });

    const result = a.transform(b, true);
    expect(result.ops).toEqual([{ retain: { image: { src: 'a.png' } } }]);

    Delta.unregisterEmbed('image');
  });
});