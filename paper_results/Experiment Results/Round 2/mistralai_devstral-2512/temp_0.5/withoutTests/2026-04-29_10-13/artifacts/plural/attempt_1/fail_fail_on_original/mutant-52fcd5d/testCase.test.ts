import plural from "./index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending with 'tropic'", () => {
    expect(plural("tropic")).toBe("tropics");
  });
});