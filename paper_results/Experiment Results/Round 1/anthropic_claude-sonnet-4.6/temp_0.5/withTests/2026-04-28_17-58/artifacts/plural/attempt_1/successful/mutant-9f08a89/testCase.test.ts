import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("monkeyPatch error message", () => {
  it("should throw an error with the correct message when plural is already defined on String prototype", () => {
    // First call sets up the plural function
    plural.monkeyPatch();

    // Second call should throw because plural is already defined
    let thrownError: Error | null = null;
    try {
      plural.monkeyPatch();
    } catch (e) {
      thrownError = e as Error;
    }

    // Clean up
    plural.unmonkeyPatch();

    expect(thrownError).not.toBeNull();
    expect(thrownError!.message).toBe("Unable to add plural function to String object");
  });
});