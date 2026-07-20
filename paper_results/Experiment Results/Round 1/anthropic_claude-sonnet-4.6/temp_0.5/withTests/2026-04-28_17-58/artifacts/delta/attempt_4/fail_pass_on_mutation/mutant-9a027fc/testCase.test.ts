import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('transform an object retain by a number retain preserves correct retain length', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a, b, priority) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a, b) => new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });

    // a retains an embed, b retains 1 with attributes
    // thisData = {delta:[...]}, otherData = 1 (number)
    // Original: typeof 1 === 'object' false → transformedData = length = 1
    // Mutated: true && 1 !== null → transformedData = otherData = 1
    // Same! But let's verify the retain value is 1 not the object
    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain(1, { bold: true });
    const expected = new Delta().retain(1, { bold: true });

    expect(a.transform(b, false)).toEqual(expected);

    Delta.unregisterEmbed('delta');
  });
});