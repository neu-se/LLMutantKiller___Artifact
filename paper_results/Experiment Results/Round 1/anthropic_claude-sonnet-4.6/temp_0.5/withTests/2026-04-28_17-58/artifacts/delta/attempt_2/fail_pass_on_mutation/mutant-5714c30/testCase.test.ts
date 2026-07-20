import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() embed handler with numeric thisData', () => {
  it('transform numeric retain against embed retain returns embed unchanged', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: unknown, b: unknown) =>
        new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a: unknown, b: unknown, priority: boolean) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a: unknown, b: unknown) =>
        new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });

    try {
      // 'a' retains a number (thisData = number, not object)
      // 'b' retains an embed object (otherData = object)
      // Original: typeof thisData === 'object' && thisData !== null is FALSE for number
      //   => skips embed handler, returns otherData as-is
      // Mutated: typeof thisData === 'object' || thisData !== null is TRUE for number
      //   => enters embed handler, Object.keys(number) = [], embedType = undefined
      //   => throws error "no handlers for embed type undefined"
      const a = new Delta().retain(1);
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });

      const result = a.transform(b, true);
      const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});