import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe("transform()", () => {
  it("transform two embed retains where handler returns empty result", () => {
    Delta.registerEmbed<{ val: number }>("myEmbed", {
      compose: (a: { val: number }, b: { val: number }) => ({ val: a.val + b.val }),
      transform: (_a: { val: number }, _b: { val: number }, _priority: boolean) => ({ val: 0 }),
      invert: (_a: { val: number }, b: { val: number }) => b,
    });

    // When thisData and otherData are both objects with same embed type,
    // transformedData should be set to handler.transform result
    const a = new Delta().retain({ myEmbed: { val: 1 } });
    const b = new Delta().retain({ myEmbed: { val: 2 } });

    try {
      const result = a.transform(b, true);
      // handler.transform returns {val: 0}, so transformedData = {myEmbed: {val: 0}}
      expect(result).toEqual(new Delta().retain({ myEmbed: { val: 0 } }));
    } finally {
      Delta.unregisterEmbed("myEmbed");
    }
  });
});