import Delta from "../../src/Delta";
import Op from "../../src/Op";

describe('transform() with embed handler', () => {
  it('transform a numeric retain against an embed retain does not throw', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a, b, priority) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a, b) => new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });

    try {
      // 'a' has a numeric retain (thisData = number)
      // 'b' has an embed retain (otherData = object)
      // In the original code, the condition `typeof thisData === 'object' && thisData !== null`
      // is false for a number, so the embed handler path is skipped.
      // In the mutated code, `typeof thisData === 'object' || thisData !== null` is true
      // for a number (since number !== null), so it tries Object.keys(number) which returns [].
      const a = new Delta().retain(1);
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });

      const result = a.transform(b, true);

      // In the original code, thisData is a number so the embed handler is NOT invoked.
      // The transformedData stays as the otherData object (the embed).
      // So the result should retain the embed as-is.
      const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});