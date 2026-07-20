import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with mismatched embed types', () => {
  it('should retain otherData unchanged when embed types differ between thisOp and otherOp', () => {
    // Register a handler for 'typeA' that throws if transform is called
    Delta.registerEmbed<{ value: number }>('typeA', {
      compose: (_a: unknown, _b: unknown, _keepNull: boolean) => ({ value: 0 }),
      invert: (_a: unknown, _b: unknown) => ({ value: 0 }),
      transform: (_a: unknown, _b: unknown, _priority: boolean) => {
        // In the mutated code (if true), this will be called with wrong embed type
        // causing it to look up 'typeA' handler but apply it to 'typeB' data
        throw new Error('transform handler should not be called for mismatched embed types');
      },
    });

    try {
      // 'this' delta retains with typeA embed
      const a = new Delta().retain({ typeA: { value: 1 } });
      // 'other' delta retains with typeB embed (different type - no handler registered)
      const b = new Delta().retain({ typeB: { value: 2 } });

      // Original: embedType='typeA', Object.keys(otherData)[0]='typeB'
      // 'typeA' !== 'typeB' => skip handler, transformedData = otherData = { typeB: { value: 2 } }
      // Mutated: if(true) => calls handler.transform with thisData['typeA'] and otherData['typeA'] (undefined)
      // This will throw because the handler throws
      expect(() => {
        a.transform(b, true);
      }).not.toThrow();

      const result = a.transform(b, true);
      const expected = new Delta().retain({ typeB: { value: 2 } });
      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('typeA');
    }
  });
});