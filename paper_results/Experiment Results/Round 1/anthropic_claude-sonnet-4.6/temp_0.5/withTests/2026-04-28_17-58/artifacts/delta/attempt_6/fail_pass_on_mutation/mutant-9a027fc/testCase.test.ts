import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('transform number retain by object retain when no embed handler match keeps otherData as retain', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a, b, priority) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a, b) => new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });

    // a retains a number, b retains an embed object
    // thisData = 1 (number), otherData = {delta:[...]} (object, non-null)
    // Original: typeof {delta:[...]} === 'object' && non-null → true → transformedData = otherData
    // Mutated: true && non-null → true → transformedData = otherData
    // SAME - both give the embed object
    // BUT: embed handler branch requires BOTH to be objects - thisData is number, so handler doesn't run
    // transformedData stays as otherData (the embed object) in both cases
    const a = new Delta().retain(1);
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
    expect(a.transform(b, false)).toEqual(expected);

    Delta.unregisterEmbed('delta');
  });
});