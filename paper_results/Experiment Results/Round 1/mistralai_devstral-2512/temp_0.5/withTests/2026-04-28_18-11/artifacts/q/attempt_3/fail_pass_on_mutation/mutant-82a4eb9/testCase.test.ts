// Test to detect the mutation in q.js
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module export behavior", () => {
  it("should export Q as the default export in CommonJS environment", () => {
    // This test verifies the module export behavior
    // The mutation changes the condition from AND to OR which could cause
    // incorrect exports in certain environments

    // Verify Q is exported as default
    expect(qModule).toBeDefined();
    expect(typeof qModule).toBe('object');
    expect(qModule.default).toBeDefined();
    expect(typeof qModule.default).toBe('function');

    // Test basic Q functionality through default export
    const promise = qModule.default.resolve(42);
    expect(promise).toBeDefined();
    expect(typeof promise.then).toBe('function');

    return promise.then((value: number) => {
      expect(value).toBe(42);
    });
  });
});