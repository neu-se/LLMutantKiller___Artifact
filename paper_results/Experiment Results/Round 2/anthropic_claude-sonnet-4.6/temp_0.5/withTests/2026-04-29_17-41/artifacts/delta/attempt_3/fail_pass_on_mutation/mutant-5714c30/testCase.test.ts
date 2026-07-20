import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('transforms numeric retain against object retain without throwing', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // thisData is a number (5), otherData is an object { delta: [...] }
      // Original: false && ... => false, skip embed branch, produce retain with otherData
      // Mutated: false || (5 !== null && true && true) => true, calls Object.keys(5) => embedType=undefined => throws
      const a = new Delta().retain(5);
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
      expect(a.transform(b, false)).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});