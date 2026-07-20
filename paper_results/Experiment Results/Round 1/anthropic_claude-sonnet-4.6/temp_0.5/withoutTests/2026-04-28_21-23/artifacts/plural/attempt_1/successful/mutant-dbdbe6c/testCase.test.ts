import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("monkeyPatch behavior", () => {
  it("should throw an error when monkeyPatch is called after unmonkeyPatch (plural is null, not undefined)", () => {
    // First, ensure we start clean
    // Reset String.prototype.plural to undefined for a clean state
    delete (String.prototype as any).plural;

    // Call monkeyPatch the first time - should succeed
    (plural as any).monkeyPatch();
    
    // Verify it was added
    expect(typeof (String.prototype as any).plural).toBe("function");
    
    // Call unmonkeyPatch - sets plural to null
    (plural as any).unmonkeyPatch();
    
    // Now String.prototype.plural is null (not undefined)
    // Original code: checks `=== undefined`, null !== undefined, so throws
    // Mutated code: checks `true`, so assigns without throwing
    expect(() => {
      (plural as any).monkeyPatch();
    }).toThrow("Unable to add plural function to String object");
    
    // Cleanup
    delete (String.prototype as any).plural;
  });
});