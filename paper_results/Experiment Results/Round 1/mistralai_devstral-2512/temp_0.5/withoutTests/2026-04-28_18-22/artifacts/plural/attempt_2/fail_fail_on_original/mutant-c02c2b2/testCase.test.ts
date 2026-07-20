import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should return plural form when num is 2", () => {
    const result = plural("cat", 2);
    expect(result).toBe("cats");
  });
});