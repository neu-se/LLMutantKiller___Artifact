import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embed handler', () => {
  it('should not invoke embed handler when thisData is a number (not an object)', () => {
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

    // thisOp.retain is a number (not an object), otherOp.retain is an object embed
    const thisDelta = new Delta().retain(1);
    const otherDelta = new Delta().retain({ image: { src: 'b.png' } });

    const result = thisDelta.transform(otherDelta, false);

    // The handler should NOT be called when thisData is a number
    expect(handlerCalled).toBe(false);
    // The result should retain the embed as-is
    expect(result.ops).toEqual([{ retain: { image: { src: 'b.png' } } }]);

    Delta.unregisterEmbed('image');
  });
});