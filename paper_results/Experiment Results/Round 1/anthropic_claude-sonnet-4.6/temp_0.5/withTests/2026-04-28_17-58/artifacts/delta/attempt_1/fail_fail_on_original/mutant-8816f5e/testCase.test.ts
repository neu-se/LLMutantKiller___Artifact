import Delta from '../../src/Delta';
import Op from '../../src/Op';

describe('transform() with embed handler when thisData is a number', () => {
  it('transforms a number retain against an embed retain without calling embed handler', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a, b, priority) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a, b) => new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });

    try {
      // a retains with a plain number, b retains with an embed object
      // In the original code, since thisData (from a) is a number, the embed handler
      // should NOT be called, and transformedData should just be otherData (the embed)
      const a = new Delta().retain(1);
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
      expect(a.transform(b, true)).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});