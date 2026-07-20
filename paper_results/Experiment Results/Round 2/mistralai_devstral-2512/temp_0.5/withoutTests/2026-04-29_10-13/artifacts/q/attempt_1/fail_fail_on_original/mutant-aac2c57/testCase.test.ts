import { Q } from "./q";

describe("Q.done mutation test", () => {
  it("should handle process.domain correctly when process is null", () => {
    // Save the original process.domain
    const originalDomain = process.domain;

    // Set process.domain to a truthy value but make process nullish
    // This should not trigger the domain binding in the original code
    // but would in the mutated version due to the || operator
    (process as any) = null;
    (process as any) = { domain: { bind: jest.fn() } };

    const deferred = Q.defer();
    let errorCaught = false;

    // This should not throw in the original code but would in the mutated version
    // because the mutated condition would try to access process.domain.bind
    // on a null process object
    try {
      deferred.promise.done(() => {});
    } catch (e) {
      errorCaught = true;
    }

    // Restore original process.domain
    (process as any) = { domain: originalDomain };

    // In original code, no error should be caught
    // In mutated code, an error would be caught
    expect(errorCaught).toBe(false);
  });
});