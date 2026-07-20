import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with words ending in 'x'", () => {
  it("should correctly pluralize words ending in 'x' by adding 'es' but not match words with 'x' in the middle", () => {
    expect(plural("box")).toBe("boxes");
    expect(plural("fox")).toBe("foxes");
    expect(plural("matrix")).toBe("matrixes");
    expect(plural("example")).toBe("examples");
  });
});