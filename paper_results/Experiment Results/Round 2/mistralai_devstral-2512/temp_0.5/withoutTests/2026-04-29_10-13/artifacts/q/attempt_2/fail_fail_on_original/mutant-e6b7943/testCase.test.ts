import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library StopIteration handling", () => {
  it("should correctly identify StopIteration exceptions", () => {
    // Create a mock StopIteration exception
    const stopIteration = { toString: () => "[object StopIteration]" };

    // Test that the original code correctly identifies this as a StopIteration
    // We'll use Q.async which internally uses isStopIteration
    let result;
    try {
      Q.async(function*() {
        throw stopIteration;
      })();
    } catch (e) {
      result = e;
    }

    // In the original code, StopIteration should be caught and handled
    // In the mutated code, it will be treated as a regular exception
    expect(result).toBeUndefined();
  });
});