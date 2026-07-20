import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('does not call embed handler when otherData is a string (not an object)', () => {
    let handlerCalled = false;
    Delta.registerEmbed('0', {
      compose: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => {
        handlerCalled = true;
        return b;
      },
      invert: (a: unknown, b: unknown) => b,
    });

    try {
      // thisData = { '0': 'x' } (object with key '0')
      // otherData = 'abc' (string, not object) - Object.keys('abc') = ['0','1','2']
      // Original: typeof otherData === 'object' is false -> skip handler block
      // Mutated: skips that check -> enters block, Object.keys('abc')[0] = '0' matches embedType '0' -> calls handler!
      const a = new Delta([{ retain: { '0': 'x' } }]);
      const b = new Delta([{ retain: 'abc' as any }]);
      a.transform(b, true);
      expect(handlerCalled).toBe(false);
    } finally {
      Delta.unregisterEmbed('0');
    }
  });
});