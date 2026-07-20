import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module loading and basic functionality", () => {
  it("should load correctly via CommonJS and Q.noConflict should throw an error indicating it only works as a global", () => {
    // The module should load successfully via CommonJS
    expect(Q).toBeDefined();
    expect(typeof Q).toBe("function");

    // Q.noConflict should throw because we're in Node.js (CommonJS path),
    // not the browser script tag path (window/self path).
    // In the original code: the browser branch is entered only when
    // (typeof window !== "undefined" || typeof self !== "undefined")
    // In the mutated code: the browser branch is entered when
    // (typeof window !== "undefined" || typeof self === "undefined")
    // In Node.js, typeof window === "undefined" AND typeof self === "undefined",
    // so the mutated code would enter the browser branch instead of throwing,
    // but since we're loaded via CommonJS, this branch is never reached.
    // The observable difference: Q.noConflict throws in Node (CommonJS path).
    expect(() => Q.noConflict()).toThrow();

    // Verify basic promise functionality works
    const deferred = Q.defer();
    deferred.resolve(42);
    return deferred.promise.then((value: number) => {
      expect(value).toBe(42);
    });
  });
});