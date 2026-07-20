import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta transform with mismatched embed types", () => {
  it("should not apply embed handler transform when embed types differ between thisOp and otherOp", () => {
    // Register two different embed handlers
    Delta.registerEmbed("imageA", {
      compose: (a: any, b: any) => ({ ...a, ...b }),
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => ({
        transformed: true,
        priority,
        fromA: a,
      }),
    });

    Delta.registerEmbed("imageB", {
      compose: (a: any, b: any) => ({ ...a, ...b }),
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => ({
        transformed: true,
        priority,
        fromB: b,
      }),
    });

    try {
      // thisOp retains an embed of type "imageA"
      const thisDelta = new Delta().retain({ imageA: { src: "a.png" } });
      // otherOp retains an embed of type "imageB" (different type!)
      const otherDelta = new Delta().retain({ imageB: { src: "b.png" } });

      const result = thisDelta.transform(otherDelta, false);

      // In original code: embedType ("imageA") !== Object.keys(otherData)[0] ("imageB")
      // So transformedData stays as otherData = { imageB: { src: "b.png" } }
      // The result should retain the original otherData unchanged
      expect(result.ops).toHaveLength(1);
      expect(result.ops[0].retain).toEqual({ imageB: { src: "b.png" } });
    } finally {
      Delta.unregisterEmbed("imageA");
      Delta.unregisterEmbed("imageB");
    }
  });
});