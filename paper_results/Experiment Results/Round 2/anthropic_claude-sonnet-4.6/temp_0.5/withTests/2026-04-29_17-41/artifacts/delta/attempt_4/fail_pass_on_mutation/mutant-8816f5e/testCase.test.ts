import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embed retain against number retain', () => {
  it('should produce empty delta when transforming embed retain against plain retain with priority', () => {
    Delta.registerEmbed<unknown[]>('delta', {
      compose: (a: unknown, b: unknown) =>
        new Delta(a as { ops: [] }).compose(new Delta(b as { ops: [] })).ops,
      transform: (a: unknown, b: unknown, priority: boolean) =>
        new Delta(a as { ops: [] }).transform(new Delta(b as { ops: [] }), priority).ops,
      invert: (a: unknown, b: unknown) =>
        new Delta(a as { ops: [] }).invert(new Delta(b as { ops: [] })).ops,
    });

    try {
      // thisData is object {delta:[...]}, otherData is number 1
      // Original: condition false (otherData not object) -> transformedData = length = 1 -> retain(1) -> chop -> empty
      // Mutated: (thisData is object && not null) is true -> enters block -> Object.keys(1) -> embedType undefined -> no handler call -> transformedData unchanged
      // The key difference: mutated initializes transformedData differently due to the changed condition on the line above
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain(1);
      const expected = new Delta();
      const result = a.transform(b, true);
      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});