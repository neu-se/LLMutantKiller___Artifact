import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform embed handling', () => {
  it('should not invoke embed handler when thisOp retain is a number (not an object)', () => {
    // Register a handler for the key 'undefined' to detect if it gets incorrectly invoked
    // when thisData is a number (Object.keys(number)[0] === undefined)
    const transformMock = jest.fn((a: unknown, b: unknown, priority: boolean) => ({ result: 'wrong' }));
    
    Delta.registerEmbed('undefined', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => ({}),
      invert: (a: unknown, b: unknown) => ({}),
      transform: transformMock,
    });

    try {
      const thisDelta = new Delta([{ retain: 1 }]);
      const otherDelta = new Delta([{ retain: {} }]);

      const result = thisDelta.transform(otherDelta, false);
      
      // Original: embed handler should NOT be called, result retains empty object
      expect(transformMock).not.toHaveBeenCalled();
      expect(result.ops).toEqual([{ retain: {} }]);
    } finally {
      Delta.unregisterEmbed('undefined');
    }
  });
});