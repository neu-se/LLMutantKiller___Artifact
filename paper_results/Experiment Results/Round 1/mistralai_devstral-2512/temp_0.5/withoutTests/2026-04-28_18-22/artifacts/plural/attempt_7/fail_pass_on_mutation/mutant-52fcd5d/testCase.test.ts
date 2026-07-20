import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle words ending in 's' that are in the misc list", () => {
    expect(plural("tropic")).toBe("tropics");
  });
});