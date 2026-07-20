import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('transform with typeof thisData check', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    // When thisData is a number and otherData is an embed,
    // the embed handler should NOT be called (Object.keys(number) = [])
    // Both original and mutated enter the block but handler isn't called
    // Result should be the embed retain unchanged
    const a = new Delta().retain(1);
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
    expect(a.transform(b, true)).toEqual(expected);
    expect(a.transform(b, false)).toEqual(expected);

    Delta.unregisterEmbed('delta');
  });
});