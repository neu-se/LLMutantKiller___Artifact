import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose()', () => {
  it('retain start optimization does not incorrectly skip object retain when this has leading inserts', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a, b, priority) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a, b) => new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });

    try {
      const a = new Delta()
        .insert({ delta: [{ insert: 'a' }] })
        .insert('B');
      const b = new Delta()
        .retain({ delta: [{ insert: 'x' }] })
        .retain(1);
      const result = a.compose(b);
      const expected = new Delta()
        .insert({ delta: [{ insert: 'xa' }] })
        .insert('B');
      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});