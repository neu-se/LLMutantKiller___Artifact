import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should throw an error when object_defineProperty is false", () => {
    // Set object_defineProperty to false
    const originalObjectDefineProperty = Q.object_defineProperty;
    Q.object_defineProperty = false;

    // Try to create a promise
    expect(() => Q(10)).toThrowError();

    // Restore the original object_defineProperty
    Q.object_defineProperty = originalObjectDefineProperty;
  });
});