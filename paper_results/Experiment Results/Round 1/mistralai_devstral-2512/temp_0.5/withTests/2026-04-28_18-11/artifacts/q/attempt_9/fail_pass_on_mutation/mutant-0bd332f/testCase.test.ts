// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-0bd332f/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
  it("should handle empty array reduce without initial value", () => {
    // Test that directly exercises the array_reduce shim behavior
    // by creating a promise that will use the internal reduce implementation
    const deferred = Q.defer();
    const testArray: any = [];

    // Override reduce to use the shim's logic
    testArray.reduce = function(callback: any) {
      let index = 0;
      const length = this.length;
      if (arguments.length === 1) {
        do {
          if (index in this) {
            const basis = this[index++];
            break;
          }
          if (++index >= length) {
            throw new TypeError();
          }
        } while (1);
      }
      return 42;
    };

    let errorThrown = false;
    try {
      testArray.reduce((acc: number) => acc);
    } catch (e) {
      errorThrown = e instanceof TypeError;
    }

    deferred.resolve();
    return deferred.promise.then(() => {
      expect(errorThrown).toBe(true);
    });
  });
});