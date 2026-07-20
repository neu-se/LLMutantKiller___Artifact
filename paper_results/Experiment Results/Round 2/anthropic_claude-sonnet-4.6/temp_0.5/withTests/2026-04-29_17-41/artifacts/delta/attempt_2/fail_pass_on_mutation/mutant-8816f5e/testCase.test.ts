import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('transform() with embed handler when thisData is a number and otherData is an object', () => {
  it('should return otherData as-is when thisData is a number retain and otherData is an embed retain', () => {
    Delta.registerEmbed<unknown[]>('delta', {
      compose: (a: unknown, b: unknown) =>
        new Delta(a as { ops: [] }).compose(new Delta(b as { ops: [] })).ops,
      transform: (a: unknown, b: unknown, priority: boolean) =>
        new Delta(a as { ops: [] }).transform(new Delta(b as { ops: [] }), priority).ops,
      invert: (a: unknown, b: unknown) =>
        new Delta(a as { ops: [] }).invert(new Delta(b as { ops: [] })).ops,
    });

    try {
      // thisData is a number (retain(1)), otherData is an object (retain({delta: [...]}))
      // Original: condition requires BOTH to be objects, so embed handler is NOT called
      // Mutated: condition uses ||, so when otherData is object, it tries to call embed handler
      // with thisData being a number, which causes Object.keys on a number -> wrong behavior
      const a = new Delta().retain(1);
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
      const result = a.transform(b, true);
      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});