import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() brace structure with embed handler', () => {
  it('should still retain when embed types do not match', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });
    Delta.registerEmbed<Op[]>('other', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // thisData is 'delta' embed, otherData is 'other' embed - types don't match
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ other: [{ insert: 'b' }] });

      // Should still produce a retain with the otherData unchanged
      const result = a.transform(b, true);
      const expected = new Delta().retain({ other: [{ insert: 'b' }] });

      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
      Delta.unregisterEmbed('other');
    }
  });
});