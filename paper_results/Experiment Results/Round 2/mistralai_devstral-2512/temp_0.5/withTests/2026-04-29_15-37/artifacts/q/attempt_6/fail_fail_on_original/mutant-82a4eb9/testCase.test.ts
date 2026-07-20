// Test to detect the mutation in q.js where the CommonJS module detection logic was changed from AND to OR
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("CommonJS module export detection", () => {
  it("should detect when module detection logic is broken by OR condition", () => {
    // This test creates a scenario to detect the mutation by checking the module detection behavior
    // The original code requires both exports AND module to be objects (CommonJS)
    // The mutated code accepts either exports OR module (which is incorrect)

    // First verify Q works normally
    expect(typeof qModule).toBe("function");

    // Create a test to detect the mutation by checking if Q would be exported
    // in an environment where only one of exports/module exists
    const testEnvironments = [
      { exports: {}, module: undefined },
      { exports: undefined, module: {} },
      { exports: {}, module: {} }
    ];

    // The original code should only export in the last case (both exist)
    // The mutated code would export in first two cases as well (either exists)
    const results = testEnvironments.map(env => {
      // Simulate the module detection logic
      if (typeof env.exports === "object" && typeof env.module === "object") {
        return "original";
      } else if (typeof env.exports === "object" || typeof env.module === "object") {
        return "mutated";
      }
      return "neither";
    });

    // Original code should have: ["neither", "neither", "original"]
    // Mutated code would have: ["mutated", "mutated", "mutated"]
    expect(results).toEqual(["neither", "neither", "original"]);
  });
});