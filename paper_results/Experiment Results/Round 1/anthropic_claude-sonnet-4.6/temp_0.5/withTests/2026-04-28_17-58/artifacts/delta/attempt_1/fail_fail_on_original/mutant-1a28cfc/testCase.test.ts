import Delta from "../../src/Delta";
import Op from "../../src/Op";

describe('getEmbedTypeAndData null check for b', () => {
  it('throws "cannot retain a object" when b is null (invert with null insert)', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a, b, priority) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a, b) => new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });

    try {
      // base has an op with insert: null, delta retains an embed over it
      // This causes getEmbedTypeAndData to be called with b = null
      const delta = new Delta().retain({ delta: [{ insert: 'a' }] });
      const base = new Delta([{ insert: null as any }]);

      expect(() => delta.invert(base)).toThrow('cannot retain a object');
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});