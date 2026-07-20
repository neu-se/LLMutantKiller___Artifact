import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - electronic word in misc list", () => {
  it("should keep 'electronics' unchanged as it is in the misc plurals-as-singular list", () => {
    const result = plural("electronics");
    expect(result).not.toBe("electronicss");
    expect(result).toBe("electronics");
  });
});