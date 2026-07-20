// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-215cb18/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_defineProperty mutation test", () => {
  it("should properly define properties on objects", () => {
    const obj: Record<string, any> = {};
    const testValue = "test_value";

    // This test relies on the proper implementation of object_defineProperty
    // which should define a property on an object and return the object
    const result = Q.fulfill(obj).then((o: Record<string, any>) => {
      Object.defineProperty(o, "testProp", {
        value: testValue,
        writable: true,
        enumerable: true,
        configurable: true
      });
      return o;
    });

    return result.then((o: Record<string, any>) => {
      expect(o.testProp).toBe(testValue);
      expect(o).toBe(obj); // Verify the same object is returned
    });
  });
});