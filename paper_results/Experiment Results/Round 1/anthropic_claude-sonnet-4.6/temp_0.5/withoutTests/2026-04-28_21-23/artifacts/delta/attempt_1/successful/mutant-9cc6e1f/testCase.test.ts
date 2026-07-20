import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta transform with mismatched embed types", () => {
  it("should not apply embed handler when embed types differ between thisData and otherData", () => {
    // Register a handler for embed type "image"
    Delta.registerEmbed("image", {
      compose: (a: unknown, b: unknown, keepNull: boolean) => ({ composed: true }),
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => ({ transformed: true, a, b }),
    });

    try {
      // thisOp retains an "image" embed
      const thisDelta = new Delta().retain({ image: { url: "http://example.com/img.png" } });
      // otherOp retains a "video" embed (different type)
      const otherDelta = new Delta().retain({ video: { url: "http://example.com/video.mp4" } });

      const result = thisDelta.transform(otherDelta, false);

      // In the original code, since embed types differ ("image" vs "video"),
      // the handler is NOT applied, and transformedData stays as otherData = {video: {...}}
      // In the mutated code, the handler IS applied (condition is `true`),
      // using handler.transform(thisData["image"], otherData["image"], priority)
      // where otherData["image"] is undefined, resulting in {image: {transformed: true, ...}}
      // instead of {video: {...}}

      // The result should retain the video embed unchanged
      expect(result.ops).toHaveLength(1);
      expect(result.ops[0].retain).toEqual({ video: { url: "http://example.com/video.mp4" } });
    } finally {
      Delta.unregisterEmbed("image");
    }
  });
});