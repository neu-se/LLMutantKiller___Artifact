import Delta from "../../src/Delta";
import Op from "../../src/Op";

describe('transform() with mismatched embed types', () => {
  it('should not apply handler when embed types differ in retain vs retain transform', () => {
    // Register a handler for 'typeA' embeds
    Delta.registerEmbed<{ value: number }>('typeA', {
      compose: (a, b, keepNull) => ({ value: (a as any).value + (b as any).value }),
      invert: (a, b) => ({ value: (b as any).value - (a as any).value }),
      transform: (a, b, priority) => {
        // This should NOT be called when embed types differ
        throw new Error('Handler should not be called for mismatched embed types');
      },
    });

    try {
      // 'this' delta retains with typeA embed
      const a = new Delta().retain({ typeA: { value: 1 } });
      // 'other' delta retains with typeB embed (different type)
      const b = new Delta().retain({ typeB: { value: 2 } });

      // In original code: embedType = 'typeA', Object.keys(otherData)[0] = 'typeB'
      // 'typeA' !== 'typeB', so the handler is NOT called
      // transformedData stays as otherData = { typeB: { value: 2 } }
      // Result: retain({ typeB: { value: 2 } })
      const result = a.transform(b, true);

      const expected = new Delta().retain({ typeB: { value: 2 } });
      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('typeA');
    }
  });
});