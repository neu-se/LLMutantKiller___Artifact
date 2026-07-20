import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle words in the misc list that end with 's'", () => {
    expect(plural("tropic")).toBe("tropics");
    expect(plural("odd")).toBe("odds");
  });
});