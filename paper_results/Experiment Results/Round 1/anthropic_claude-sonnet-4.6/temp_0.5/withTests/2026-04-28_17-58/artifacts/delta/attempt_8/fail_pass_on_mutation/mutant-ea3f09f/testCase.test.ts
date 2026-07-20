import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('uses numeric retain when thisData is object but otherData is a number, preserving attributes', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // a retains an embed object, b retains a number with attributes
      // Original: skips embed handler, retains numeric length with transformed attributes
      // Mutated: enters embed handler with otherData as number, produces wrong result
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain(1, { bold: true });
      // Original should retain 1 with bold:true (numeric retain, attributes pass through)
      const expected = new Delta().retain(1, { bold: true });
      const result = a.transform(b, false);
      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});