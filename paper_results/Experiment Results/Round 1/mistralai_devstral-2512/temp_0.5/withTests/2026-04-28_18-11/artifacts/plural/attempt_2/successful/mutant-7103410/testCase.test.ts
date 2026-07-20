import { plural, monkeyPatch } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("monkeyPatch functionality", () => {
  it("should correctly pluralize words when called as a String prototype method", () => {
    monkeyPatch();
    const testWord = "test";
    const result = (testWord as any).plural();
    expect(result).toBe("tests");
  });
});