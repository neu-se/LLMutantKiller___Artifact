import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('transform two embed retains with no handler match keeps otherData as retain value', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a, b, priority) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a, b) => new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });
    Delta.registerEmbed<Op[]>('other', {
      compose: (a, b) => new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a, b, priority) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a, b) => new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });

    // thisData = {delta:[...]}, otherData = {other:[...]}
    // Both objects, but embed types differ → handler branch condition false
    // transformedData keeps initial value
    // Original: typeof {other:[...]} === 'object' && non-null → true → otherData
    // Mutated: true && non-null → true → otherData
    // Same! Both give otherData.
    // This confirms equivalent for object otherData.
    
    // What about thisData=number, otherData=object, no handler needed?
    // a=retain(1), b=retain({delta:[...]})
    // thisData=1, otherData={delta:[...]}
    // embed handler branch: typeof 1 === 'object' → false → skip
    // transformedData = otherData in both cases
    const a = new Delta().retain(1);
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
    expect(a.transform(b, false)).toEqual(expected);

    Delta.unregisterEmbed('delta');
    Delta.unregisterEmbed('other');
  });
});