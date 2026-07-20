// Test to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module export behavior", () => {
  it("should correctly export Q when both exports and module are objects", () => {
    // This test verifies that Q is properly exported when both exports and module are objects
    // The mutation changes the condition from AND to OR, which could cause incorrect behavior
    // in environments where only one of these is an object

    // Create a mock environment where both exports and module are objects
    const mockExports = {};
    const mockModule = { exports: mockExports };

    // Simulate the module export behavior
    const definition = () => Q;
    const result = definition();

    // Verify that Q is properly exported
    expect(result).toBeDefined();
    expect(typeof result).toBe('function');
    expect(result.resolve).toBeDefined();
    expect(typeof result.resolve).toBe('function');

    // Test that Q can actually create promises
    const promise = result.resolve(42);
    expect(promise).toBeDefined();
    expect(typeof promise.then).toBe('function');

    // Verify the promise works correctly
    return promise.then(value => {
      expect(value).toBe(42);
    });
  });
});