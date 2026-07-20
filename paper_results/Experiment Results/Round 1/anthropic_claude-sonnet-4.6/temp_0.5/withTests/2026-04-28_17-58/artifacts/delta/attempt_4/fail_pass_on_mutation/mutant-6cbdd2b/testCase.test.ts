import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose()', () => {
  it('retain start optimization only applies to numeric retains', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a, b, priority) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a, b) => new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });

    try {
      // a has leading inserts followed by an embed
      // b starts with an object retain (no attributes) - optimization should NOT apply
      const a = new Delta()
        .insert('A', { bold: true })
        .insert('B')
        .insert({ delta: [{ insert: 'x' }] });
      
      const b = new Delta()
        .retain(2)
        .retain({ delta: [{ insert: 'y' }] });
      
      const result = a.compose(b);
      
      const expected = new Delta()
        .insert('A', { bold: true })
        .insert('B')
        .insert({ delta: [{ insert: 'yx' }] });
      
      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});