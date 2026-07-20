import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module loading", () => {
  it("should load successfully without throwing an error in environments where self is defined", () => {
    // In Node.js, typeof self is "object" (not "undefined"), so:
    // Original condition: typeof window !== "undefined" || typeof self !== "undefined"
    //   = false || true = true → enters the browser-like branch (works)
    // Mutated condition: typeof window !== "undefined" || typeof self === "undefined"
    //   = false || false = false → falls to else { throw new Error(...) }
    //
    // Therefore, if the module loads successfully, we know the original code is running.
    // If the module throws during load, the mutated code is running.
    
    expect(typeof Q).toBe("function");
    expect(Q).toBeDefined();
  });
});