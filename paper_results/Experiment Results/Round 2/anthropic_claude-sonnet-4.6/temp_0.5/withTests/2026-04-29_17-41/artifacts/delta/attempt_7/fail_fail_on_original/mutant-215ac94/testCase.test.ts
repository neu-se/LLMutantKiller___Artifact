import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('should not call embed handler when thisData is numeric retain', () => {
    Delta.registerEmbed('undefined', {
      compose: (_a: unknown, _b: unknown, _k: boolean): unknown => _b,
      transform: (_a: unknown, _b: unknown, _p: boolean): unknown => 'MUTATED',
      invert: (_a: unknown, _b: unknown): unknown => _b,
    });
    try {
      const a = new Delta([{ retain: 1 }]);
      const b = new Delta([{ retain: {} as any }]);
      const result = a.transform(b, false);
      // Original: thisData=1 not object, skip block, transformedData=length=1, retain(1) then chop = empty
      // Mutated: enter block, embedType=undefined, Object.keys({})[0]=undefined, match,
      //          handler returns 'MUTATED', transformedData={"undefined":"MUTATED"}, retain({"undefined":"MUTATED"})
      expect(result.ops).toEqual([]);
    } finally {
      Delta.unregisterEmbed('undefined');
    }
  });
});