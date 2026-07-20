import Delta from "../../src/Delta";
import Op from "../../src/Op";

describe('transform() with mismatched embed types', () => {
  it('should not call handler when embed types differ between this and other retain', () => {
    // Register a handler for 'typeA' only
    Delta.registerEmbed<Op[]>('typeA', {
      compose: (a, b) => new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a, b, priority) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a, b) => new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });

    try {
      // 'this' retains typeA embed, 'other' retains typeB embed
      // Since embed types differ, original code skips the handler and keeps otherData as-is
      // Mutated code tries to call handler for 'typeA' with typeB data, producing wrong result
      const a = new Delta().retain({ typeA: [{ insert: 'a' }] });
      const b = new Delta().retain({ typeB: [{ insert: 'b' }] });

      // In original: condition `embedType === Object.keys(otherData)[0]` is false
      // ('typeA' !== 'typeB'), so transformedData stays as otherData = { typeB: [...] }
      // Result: retain({ typeB: [{ insert: 'b' }] })
      //
      // In mutated: condition is always true, so it calls handler.transform with
      // thisData[typeA] and otherData[typeA] (which is undefined), producing wrong result
      const expected = new Delta().retain({ typeB: [{ insert: 'b' }] });
      const result = a.transform(b, true);
      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('typeA');
    }
  });
});