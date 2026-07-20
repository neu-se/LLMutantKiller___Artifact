import plural from "./index.js";

describe("plural function with f/fe ending words", () => {
  it("should correctly pluralize 'roof' to 'roofs'", () => {
    expect(plural("roof")).toBe("roofs");
  });
});