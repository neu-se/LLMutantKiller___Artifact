import Delta from "../../src/Delta";
import Op from "../../src/Op";

describe('getEmbedTypeAndData null check for b', () => {
  it('should throw when b (insert value) is null during invert', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    // base has an op with insert: null (raw construction)
    const base = new Delta([{ insert: null as unknown as string }]);
    const delta = new Delta().retain({ delta: [{ insert: 'a' }] });

    expect(() => {
      delta.invert(base);
    }).toThrow();

    Delta.unregisterEmbed('delta');
  });
});