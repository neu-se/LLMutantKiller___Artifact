import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe("transform()", () => {
  it("transform embed retain with matching embed types calls handler", () => {
    const transformFn = jest.fn((a: unknown, b: unknown, priority: boolean) => b);
    
    Delta.registerEmbed("myEmbed", {
      compose: (a: unknown, b: unknown) => b,
      transform: transformFn,
      invert: (_a: unknown, b: unknown) => b,
    });

    const a = new Delta().retain({ myEmbed: "dataA" });
    const b = new Delta().retain({ myEmbed: "dataB" });

    try {
      const result = a.transform(b, true);
      expect(transformFn).toHaveBeenCalledWith("dataA", "dataB", true);
      expect(result).toEqual(new Delta().retain({ myEmbed: "dataB" }));
    } finally {
      Delta.unregisterEmbed("myEmbed");
    }
  });
});