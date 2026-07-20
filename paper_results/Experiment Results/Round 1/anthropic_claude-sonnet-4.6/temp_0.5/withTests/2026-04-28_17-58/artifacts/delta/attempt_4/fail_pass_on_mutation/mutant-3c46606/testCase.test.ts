import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() embed handler actually transforms data', () => {
  it('should use handler to transform embed data with priority=true, producing different result than untransformed', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });

      const result = a.transform(b, true);

      // With priority=true, handler.transform([{insert:'a'}], [{insert:'b'}], true)
      // = new Delta([{insert:'a'}]).transform(new Delta([{insert:'b'}]), true)
      // = new Delta().retain(1).insert('b')
      // So transformedData = { delta: [{retain:1},{insert:'b'}] }
      // NOT just { delta: [{insert:'b'}] } which is what mutant returns
      const expected = new Delta().retain({
        delta: [{ retain: 1 }, { insert: 'b' }],
      });

      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});