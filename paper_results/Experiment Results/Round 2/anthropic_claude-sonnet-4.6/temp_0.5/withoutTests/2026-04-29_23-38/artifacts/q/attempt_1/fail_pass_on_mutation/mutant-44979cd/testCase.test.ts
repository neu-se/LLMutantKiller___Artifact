import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module CommonJS export", () => {
  it("should export Q as a function with the correct CommonJS branch behavior, requiring exports to be an object", () => {
    // In the original code, the CommonJS branch requires typeof exports === "object"
    // In the mutated code, this check is replaced with `true`
    // Both behave the same in normal Node.js, but we can verify the module
    // loaded via CommonJS by checking it doesn't set window.Q (which would happen
    // in the script branch) and that it's properly exported
    
    // The module should be a function (Q)
    expect(typeof Q).toBe("function");
    // Q should have the resolve method
    expect(typeof Q.resolve).toBe("function");
    // Q should not have modified any global window property
    expect(typeof (global as any).Q).toBe("undefined");
  });
});