import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural misc words", () => {
  it("should return 'tropics' unchanged when already plural", () => {
    // In original, 'tropic' is in misc so 'tropics' matches and returns unchanged
    // In mutated, 'tropic' is replaced by "", so 'tropics' no longer matches via 'tropic'
    // The empty string alternative matches \bs\b not \btropics\b
    // So 'tropics' falls through to s$ rule and becomes 'tropicses'
    const result = plural("tropics");
    expect(result).toBe("tropics");
  });
});