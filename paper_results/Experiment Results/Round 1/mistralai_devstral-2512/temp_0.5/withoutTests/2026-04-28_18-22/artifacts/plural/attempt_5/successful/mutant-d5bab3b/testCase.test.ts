import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle word boundaries for 'woman'", () => {
    expect(plural("woman")).toBe("women");
    expect(plural("womanly")).toBe("womanlies");
  });
});