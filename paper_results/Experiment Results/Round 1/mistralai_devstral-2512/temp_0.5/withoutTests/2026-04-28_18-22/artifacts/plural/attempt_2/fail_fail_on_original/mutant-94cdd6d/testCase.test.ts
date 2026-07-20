import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function behavior with undefined count", () => {
  it("should pluralize when count is undefined", () => {
    expect(plural("box", undefined)).toBe("boxes");
  });
});