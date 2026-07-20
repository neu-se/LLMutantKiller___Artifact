import { monkeyPatch } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural monkey patching", () => {
  it("should correctly pluralize words when called as a string method", () => {
    monkeyPatch();
    const result = "test".plural(2);
    expect(result).toBe("tests");
  });
});