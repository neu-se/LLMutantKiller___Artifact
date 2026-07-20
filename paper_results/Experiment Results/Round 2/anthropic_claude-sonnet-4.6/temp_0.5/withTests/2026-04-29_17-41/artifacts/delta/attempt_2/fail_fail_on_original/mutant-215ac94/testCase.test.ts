import Delta from "../../src/Delta";
import Op from "../../src/Op";

describe('transform()', () => {
  it('transform embed with numeric retain should use handler correctly', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a, b, priority) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a, b) => new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });

    try {
      // thisData is a number (1), otherData is an embed object
      const a = new Delta().retain(1);
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      
      // Original: skips embed handler block (thisData is number, not object)
      // Result: retain({delta: [{insert: 'b'}]}) with no handler transformation
      const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
      expect(a.transform(b, true)).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});