import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should handle the case where num is exactly 1 vs other values", () => {
    const result1 = plural("box", 1);
    const result2 = plural("box", 2);
    expect(result1).toBe("box");
    expect(result2).toBe("boxes");
  });
});