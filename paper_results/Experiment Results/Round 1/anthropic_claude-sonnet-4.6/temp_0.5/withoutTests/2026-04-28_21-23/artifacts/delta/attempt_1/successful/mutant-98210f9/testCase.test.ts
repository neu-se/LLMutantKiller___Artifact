import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta compose retain embed', () => {
  it('should pass keepNull=true when composing retain embed with retain embed', () => {
    Delta.registerEmbed('image', {
      compose: (a: any, b: any, keepNull: boolean) => ({ ...a, ...b, keepNull }),
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
    });

    const delta1 = new Delta().retain({ image: { src: 'a.png' } });
    const delta2 = new Delta().retain({ image: { alt: 'text' } });

    const result = delta1.compose(delta2);
    expect(result.ops[0]).toEqual({ retain: { image: { src: 'a.png', alt: 'text', keepNull: true } } });

    Delta.unregisterEmbed('image');
  });
});