import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('transform()', () => {
  it('should not invoke embed handler when this and other retain have different embed types', () => {
    // Register a handler only for 'typeA'
    Delta.registerEmbed<Op[]>('typeA', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // 'this' retains typeA embed, 'other' retains typeB embed (different types)
      // Original: condition `embedType === Object.keys(otherData)[0]` => 'typeA' === 'typeB' is false
      //   => handler is NOT called, transformedData stays as otherData = { typeB: [...] }
      //   => result is retain({ typeB: [...] })
      // Mutated: condition is always true
      //   => handler IS called with thisData['typeA'] and otherData['typeA'] (undefined)
      //   => transform called on undefined, producing wrong/unexpected result
      const a = new Delta().retain({ typeA: [{ insert: 'x' }] });
      const b = new Delta().retain({ typeB: [{ insert: 'y' }] });

      const expected = new Delta().retain({ typeB: [{ insert: 'y' }] });
      const result = a.transform(b, true);
      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('typeA');
    }
  });
});