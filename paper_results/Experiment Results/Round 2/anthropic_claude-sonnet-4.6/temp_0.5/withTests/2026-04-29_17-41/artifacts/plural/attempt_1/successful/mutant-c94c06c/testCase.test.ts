import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - roof exception for f/fe rule", () => {
  it("should pluralize 'roof' as 'roofs' not 'rooves'", () => {
    expect(plural("roof")).toBe("roofs");
  });
});