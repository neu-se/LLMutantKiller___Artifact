import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('transforms retain with object embed against numeric retain and produces numeric retain in result', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    // thisData = { delta: [...] } (object), otherData = 1 (number)
    // Original: typeof 1 === 'object' -> false -> transformedData = length = 1 (number)
    // Mutated:  true -> transformedData = otherData = 1 (number, same value)
    // Both produce retain(1, { bold: true }) - same result
    // Need a different approach: check that the retain op type is correct
    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain(1, { bold: true });
    const result = a.transform(b, true);
    expect(result.ops).toEqual([{ retain: 1, attributes: { bold: true } }]);
    expect(typeof result.ops[0].retain).toBe('number');

    Delta.unregisterEmbed('delta');
  });
});