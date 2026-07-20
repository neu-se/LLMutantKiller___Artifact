import { Q } from "./q";

describe("Q library stack trace filtering", () => {
  it("should properly filter internal stack traces when long stack support is enabled", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a chain of promises that will generate a stack trace
    const promise = Q.resolve()
      .then(() => {
        throw new Error("Test error");
      })
      .catch((error) => {
        // The stack trace should be filtered to remove Q internal frames
        expect(error.stack).toBeDefined();
        // Check that the stack doesn't contain Q internal implementation details
        // The mutation would cause this to fail because it would return undefined
        // instead of properly filtering the stack
        expect(error.stack).not.toContain("q.js");
        return "recovered";
      });

    const result = await promise;
    expect(result).toBe("recovered");
  });
});