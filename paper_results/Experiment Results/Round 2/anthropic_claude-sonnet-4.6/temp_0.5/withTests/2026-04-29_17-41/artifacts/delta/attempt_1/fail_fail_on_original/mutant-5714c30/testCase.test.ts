import Delta from "../../src/Delta";
import Op from "../../src/Op";

describe('transform() with numeric thisData and object otherData', () => {
  it('transforms a numeric retain against an embed retain without calling embed handler', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // 'this' has a numeric retain(1), 'other' has an object retain({ delta: [...] })
      // In transform, thisData = 1 (number), otherData = { delta: [...] } (object)
      // Original: typeof thisData === 'object' && thisData !== null && ... => false (number is not object), skip embed handler
      // Mutated:  typeof thisData === 'object' || thisData !== null && ... => true (1 !== null), tries Object.keys(1) which throws
      const a = new Delta().retain(1);
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
      expect(a.transform(b, true)).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});