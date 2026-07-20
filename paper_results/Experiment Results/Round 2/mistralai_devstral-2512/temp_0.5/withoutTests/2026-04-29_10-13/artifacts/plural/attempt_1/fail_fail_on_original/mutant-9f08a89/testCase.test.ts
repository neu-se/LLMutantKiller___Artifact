import plural from "./index.js";

describe("plural monkeyPatch error message", () => {
  it("should throw an error with a specific message when monkeyPatch is called twice", () => {
    // First call should succeed
    plural.monkeyPatch();

    // Second call should throw with specific message
    expect(() => {
      plural.monkeyPatch();
    }).toThrow("Unable to add plural function to String object");
  });
});