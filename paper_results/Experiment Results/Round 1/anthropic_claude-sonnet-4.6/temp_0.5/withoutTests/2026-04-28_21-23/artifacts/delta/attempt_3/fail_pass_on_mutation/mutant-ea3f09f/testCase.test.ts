import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform", () => {
  it("should not invoke embed handler when otherData is not an object type", () => {
    const transformFn = jest.fn(() => ({ result: "transformed" }));
    Delta.registerEmbed("0", {
      compose: () => ({}),
      invert: () => ({}),
      transform: transformFn,
    });

    try {
      // thisData is an object with key "0", otherData is a string "x"
      // Object.keys("x")[0] === "0" === Object.keys(thisData)[0]
      // Original: typeof "x" === 'object' is false → block skipped → handler NOT called
      // Mutated: true → block entered → handler IS called → different transformedData
      const thisDelta = new Delta([{ retain: { "0": { src: "a" } } }]);
      const otherDelta = new Delta([{ retain: "x" as any }]);

      thisDelta.transform(otherDelta, false);

      // In original: handler should NOT be called
      expect(transformFn).not.toHaveBeenCalled();
    } finally {
      Delta.unregisterEmbed("0");
    }
  });
});