import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should produce correct output when thisOp has empty object retain and otherOp has numeric retain', () => {
    // Register a handler for 'undefined' embed type
    Delta.registerEmbed('undefined', {
      compose: (_a: unknown, _b: unknown, _keepNull: boolean) => ({}),
      invert: (_a: unknown, _b: unknown) => ({}),
      transform: (_a: unknown, _b: unknown, _priority: boolean) => 'transformed',
    });

    try {
      // thisData = {}, otherData = 1 (number)
      // Original: condition false → transformedData = length = 1
      // Mutated: condition true → embedType = undefined → Object.keys(1)[0] = undefined → match!
      //          → handler.transform called → transformedData = { undefined: 'transformed' }
      const thisDelta = new Delta().retain({}).insert('x');
      const otherDelta = new Delta().retain(1).insert('y');
      
      const result = thisDelta.transform(otherDelta, false);
      
      // In original: retain(1) then insert('y')
      // After chop: retain(1) is not trailing, so stays
      // Actually retain(1) followed by insert('y') - chop removes trailing plain retains
      // retain(1) is not trailing (insert follows), so result = [{ retain: 1 }, { insert: 'y' }]
      expect(result.ops).toEqual([{ retain: 1 }, { insert: 'y' }]);
    } finally {
      Delta.unregisterEmbed('undefined');
    }
  });
});