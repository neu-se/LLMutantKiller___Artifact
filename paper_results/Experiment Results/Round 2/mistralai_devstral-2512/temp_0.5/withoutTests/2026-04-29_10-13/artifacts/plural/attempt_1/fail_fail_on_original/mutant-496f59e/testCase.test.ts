import plural from "./index.js";

describe("plural function", () => {
  it("should correctly pluralize words using string-based rules", () => {
    // This test targets the mutation by using a rule where rule[1] is a string (not a function)
    // The mutation changes the condition from checking if rule[1] is a Function to always true
    // This will cause it to try to call a string as a function, which should fail
    expect(plural("bacterium")).toBe("bacteria");
  });
});