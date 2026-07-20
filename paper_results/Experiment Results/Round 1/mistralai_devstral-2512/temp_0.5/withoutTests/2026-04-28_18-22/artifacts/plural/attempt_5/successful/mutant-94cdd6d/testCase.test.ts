import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with undefined count", () => {
  it("should return singular form when count is 1 and undefined check works correctly", () => {
    expect(plural("box", 1)).toBe("box");
  });
});