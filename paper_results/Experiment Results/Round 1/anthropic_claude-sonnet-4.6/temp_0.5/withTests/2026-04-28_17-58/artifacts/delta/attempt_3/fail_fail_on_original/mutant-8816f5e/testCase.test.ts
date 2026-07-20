import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('transforms an embed retain against a number retain correctly without invoking embed handler', () => {
    const transformCalls: Array<[unknown, unknown, boolean]> = [];

    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) => {
        transformCalls.push([a, b, priority]);
        return new Delta(a).transform(new Delta(b), priority).ops;
      },
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // thisData is an embed object, otherData is a plain number
      // Original: both must be objects -> false -> handler NOT called -> transformedData = length
      // Mutated: thisData is object -> true -> handler IS called with wrong args
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain(1);
      const expected = new Delta().retain(1);
      expect(a.transform(b, true)).toEqual(expected);
      expect(transformCalls.length).toEqual(0);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});