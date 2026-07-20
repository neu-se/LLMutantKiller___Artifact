import plural from "./index.js";

describe("plural function", () => {
  it("should correctly pluralize 'tropic' to 'tropics'", () => {
    expect(plural("tropic")).toBe("tropics");
  });
});