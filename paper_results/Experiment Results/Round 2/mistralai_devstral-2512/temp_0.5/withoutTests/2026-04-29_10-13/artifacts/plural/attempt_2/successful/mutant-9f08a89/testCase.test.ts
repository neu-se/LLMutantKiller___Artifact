import { monkeyPatch } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("monkeyPatch error handling", () => {
  it("should throw error with specific message when called twice", () => {
    // First call should succeed
    monkeyPatch();

    // Second call should throw with specific message
    expect(() => monkeyPatch()).toThrow("Unable to add plural function to String object");
  });
});