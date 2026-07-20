import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('transform embed retain with number retain produces correct result', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // a has numeric retain, b has embed retain
      // thisData = 1 (number), otherData = {delta: [...]} (object)
      // Both original and mutant: enter block, Object.keys(1) = [], no match, transformedData = otherData
      const a = new Delta().retain(1);
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
      expect(a.transform(b, true)).toEqual(expected);
      expect(a.transform(b, false)).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});