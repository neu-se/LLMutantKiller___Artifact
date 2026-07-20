import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('transform() embed retain against number retain', () => {
  it('should correctly transform an embed retain (thisOp) against a number retain (otherOp)', () => {
    Delta.registerEmbed<unknown[]>('delta', {
      compose: (a: unknown, b: unknown) =>
        new Delta(a as { ops: [] }).compose(new Delta(b as { ops: [] })).ops,
      transform: (a: unknown, b: unknown, priority: boolean) =>
        new Delta(a as { ops: [] }).transform(new Delta(b as { ops: [] }), priority).ops,
      invert: (a: unknown, b: unknown) =>
        new Delta(a as { ops: [] }).invert(new Delta(b as { ops: [] })).ops,
    });

    try {
      // thisData is an object (retain({delta:[...]})), otherData is a number (retain(1))
      // Original: condition requires BOTH to be objects -> false -> transformedData = length (1)
      // Mutated: (thisData is object && not null) || ... -> true -> tries embed handler with number otherData
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain(1);
      const expected = new Delta().retain(1);
      const result = a.transform(b, true);
      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});