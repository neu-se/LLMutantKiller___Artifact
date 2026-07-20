import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embed types', () => {
  it('should not invoke embed handler when otherData is a number (not an object)', () => {
    // Register an embed handler that tracks calls
    let handlerCalled = false;
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => {
        handlerCalled = true;
        return b;
      },
    });

    try {
      // thisOp has an embed retain (object), otherOp has a number retain
      // In this case, the embed handler should NOT be called
      const thisDelta = new Delta().retain({ image: { src: 'a.png' } });
      const otherDelta = new Delta().retain(1);

      const result = thisDelta.transform(otherDelta, false);

      // The handler should NOT have been called since otherData is a number
      expect(handlerCalled).toBe(false);
      // The result should retain length 1 (number retain)
      expect(result.ops).toEqual([{ retain: 1 }]);
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});