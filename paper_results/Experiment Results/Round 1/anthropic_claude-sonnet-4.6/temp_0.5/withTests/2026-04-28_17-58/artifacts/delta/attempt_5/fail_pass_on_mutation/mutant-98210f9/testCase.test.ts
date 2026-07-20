import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() retain-embed with retain-embed', () => {
  it('the composed op should be a retain not an insert, affecting document length calculation', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // thisOp.retain is object (not null) - original uses 'retain', mutated uses 'insert'
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      const composed = a.compose(b);

      // changeLength() counts inserts as positive, retains as 0
      // If mutated: composed has insert op => changeLength = +1
      // If original: composed has retain op => changeLength = 0
      expect(composed.changeLength()).toBe(0);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});