import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform embed mutation', () => {
  it('should not call embed handler transform when otherOp retain is a number', () => {
    let transformCallCount = 0;

    // Register handler for empty string key (what Object.keys({}) might produce)
    // Actually register for undefined - what Object.keys(number)[0] produces
    Delta.registerEmbed('undefined', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (a: unknown, _b: unknown) => a,
      transform: (_a: unknown, _b: unknown, _priority: boolean) => {
        transformCallCount++;
        return { result: 'mutated' };
      },
    });

    try {
      const thisDelta = new Delta().retain({ undefined: { data: 'x' } });
      const otherDelta = new Delta().retain(1);

      const result = thisDelta.transform(otherDelta, false);

      // In original: otherData is number, embed block skipped, transformedData = 1
      // In mutated: embed block entered, Object.keys(1) = [], embedType = undefined,
      // embedType === Object.keys(otherData)[0] => undefined === undefined => true
      // handler.transform called, transformedData = { undefined: { result: 'mutated' } }
      expect(transformCallCount).toBe(0);
      expect(result.ops).toEqual([{ retain: 1 }]);
    } finally {
      Delta.unregisterEmbed('undefined');
    }
  });
});