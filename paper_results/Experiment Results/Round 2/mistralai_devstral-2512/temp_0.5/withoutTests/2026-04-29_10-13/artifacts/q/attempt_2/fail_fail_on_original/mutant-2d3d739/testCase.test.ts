import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q library object_defineProperty functionality", () => {
  it("should correctly use object_defineProperty to set promise stack traces", () => {
    // This test verifies that object_defineProperty is working correctly
    // by checking that long stack traces are properly set on promises
    Q.longStackSupport = true;

    const promise = Q.resolve(42);

    // The original code should properly define the stack property
    // The mutated code (object_defineProperty = false) will fail here
    expect(promise.stack).toBeDefined();
    expect(typeof promise.stack).toBe("string");
  });
});