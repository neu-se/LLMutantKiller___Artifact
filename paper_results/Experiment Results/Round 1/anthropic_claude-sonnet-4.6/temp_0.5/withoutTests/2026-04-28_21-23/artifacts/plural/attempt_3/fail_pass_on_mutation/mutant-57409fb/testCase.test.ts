import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should pluralize when num argument is omitted entirely vs passed as undefined", () => {
    // Test with no argument - exercises the undefined path
    const resultNoArg = plural("cat");
    const resultUndefined = plural("cat", undefined);
    expect(resultNoArg).toBe("cats");
    expect(resultUndefined).toBe("cats");
  });
});