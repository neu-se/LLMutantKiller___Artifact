// Test to detect the mutation in q.js
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module export behavior", () => {
  it("should export Q correctly in CommonJS environment", () => {
    // This test verifies the module export behavior
    // The mutation changes the condition from AND to OR which could cause
    // incorrect exports in certain environments

    // Verify Q is exported
    expect(qModule).toBeDefined();
    expect(typeof qModule).toBe('function');

    // Test basic Q functionality
    const promise = qModule.resolve(42);
    expect(promise).toBeDefined();
    expect(typeof promise.then).toBe('function');

    return promise.then((value: number) => {
      expect(value).toBe(42);
    });
  });
});