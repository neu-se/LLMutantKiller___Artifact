import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('transform embed retains with same type and priority correctly applies handler', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      
      const result1 = a.transform(b, true);
      const result2 = a.transform(b, false);
      
      expect(result1).toEqual(new Delta().retain({ delta: [{ retain: 1 }, { insert: 'b' }] }));
      expect(result2).toEqual(new Delta().retain({ delta: [{ insert: 'b' }] }));
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});