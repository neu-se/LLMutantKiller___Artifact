import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('should not call embed handler when thisData is a numeric retain and otherData is empty object', () => {
    Delta.registerEmbed('undefined', {
      compose: (_a: unknown, _b: unknown, _k: boolean): unknown => _b,
      transform: (_a: unknown, _b: unknown, _p: boolean): unknown => 'mutated',
      invert: (_a: unknown, _b: unknown): unknown => _b,
    });
    try {
      const a = new Delta([{ retain: 1 }]);
      const b = new Delta([{ retain: {} as any }]);
      const result = a.transform(b, false);
      // Original: typeof 1 === 'object' is false → skip block → transformedData = {} (otherData)
      //           result: [{retain: {}}]
      // Mutated:  enter block → Object.keys(1)[0]=undefined, Object.keys({})[0]=undefined
      //           match! → handler called → transformedData = {"undefined": "mutated"}
      //           result: [{retain: {"undefined": "mutated"}}]
      expect(result.ops).toEqual([{ retain: {} }]);
    } finally {
      Delta.unregisterEmbed('undefined');
    }
  });
});