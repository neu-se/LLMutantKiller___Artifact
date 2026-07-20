import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() retain embed keepNull behavior', () => {
  it('passes keepNull=true when composing retain embed with retain embed', () => {
    const composeCalls: boolean[] = [];

    Delta.registerEmbed('myembed', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => {
        composeCalls.push(keepNull);
        return { value: 1 };
      },
      transform: (a: unknown, b: unknown, priority: boolean) => ({ value: 1 }),
      invert: (a: unknown, b: unknown) => ({ value: 1 }),
    });

    try {
      const a = new Delta().retain({ myembed: { value: 1 } });
      const b = new Delta().retain({ myembed: { value: 2 } });

      a.compose(b);

      // Original: action='retain', keepNull = true
      // Mutated: action='insert', keepNull = false
      expect(composeCalls).toEqual([true]);
    } finally {
      Delta.unregisterEmbed('myembed');
    }
  });
});