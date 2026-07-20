import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta transform with mixed retain types", () => {
  it("should not invoke embed handler when otherData is a number retain while thisData is an object retain", () => {
    // Register a handler for embed type "image"
    const transformMock = jest.fn((a: unknown, b: unknown, priority: boolean) => ({ merged: true }));
    
    Delta.registerEmbed("image", {
      compose: (a: unknown, b: unknown, keepNull: boolean) => ({}),
      invert: (a: unknown, b: unknown) => ({}),
      transform: transformMock,
    });

    try {
      // thisOp: retain an embed object { image: { url: "x" } }
      // otherOp: retain a number (length 1)
      // In original: typeof otherData === 'object' is false (it's a number), so handler NOT called
      // In mutated: true replaces that check, so handler IS called with a number as otherData

      const thisDelta = new Delta().retain({ image: { url: "x" } });
      const otherDelta = new Delta().retain(1);

      const result = thisDelta.transform(otherDelta, false);

      // In the original code, the embed handler should NOT be called
      // because otherData is a number, not an object
      expect(transformMock).not.toHaveBeenCalled();

      // The result should be a simple retain of length 1 (the number)
      expect(result.ops).toEqual([{ retain: 1 }]);
    } finally {
      Delta.unregisterEmbed("image");
    }
  });
});