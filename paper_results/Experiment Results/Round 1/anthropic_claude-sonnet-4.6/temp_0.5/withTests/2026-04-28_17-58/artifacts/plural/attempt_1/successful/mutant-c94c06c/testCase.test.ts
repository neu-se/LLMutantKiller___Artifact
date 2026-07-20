import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - roof exception", () => {
  it("should not convert 'roof' to 'rooves' but keep it as 'roofs'", () => {
    expect(plural("roof")).toBe("roofs");
  });
});