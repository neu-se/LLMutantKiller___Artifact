import plural from "./index.js";

describe("monkeyPatch functionality", () => {
  it("should correctly pluralize words when called as a String prototype method", () => {
    plural.monkeyPatch();
    const testWord = "test";
    const result = testWord.plural();
    expect(result).toBe("tests");
  });
});