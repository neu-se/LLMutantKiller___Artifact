import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('transform retain + retain with embed produces correct attributes', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain({ delta: [{ insert: 'a' }] }, { bold: true });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] }, { italic: true });
    
    const result = a.transform(b, true);
    // When priority=true, a's attributes win over b's for same keys
    // but b's italic should remain since a doesn't have italic
    expect(result).toEqual(
      new Delta().retain(
        { delta: [{ retain: 1 }, { insert: 'b' }] },
        { italic: true }
      )
    );

    Delta.unregisterEmbed('delta');
  });
});