import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - roof should not be converted to roves", () => {
  it("should return 'roofs' for 'roof' (not 'rooves'), since roof is an exception to the f/fe rule", () => {
    expect(plural("roof")).toBe("roofs");
  });
});