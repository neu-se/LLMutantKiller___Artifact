import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending with 'x'", () => {
    expect(plural("box", 2)).toBe("boxes");
    expect(plural("fox", 2)).toBe("foxes");
    expect(plural("matrix", 2)).toBe("matrixes");
  });
});