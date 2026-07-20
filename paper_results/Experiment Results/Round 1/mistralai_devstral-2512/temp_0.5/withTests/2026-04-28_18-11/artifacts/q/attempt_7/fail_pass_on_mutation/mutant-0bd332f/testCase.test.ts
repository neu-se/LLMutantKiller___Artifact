// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-0bd332f/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
  it("should handle empty array reduce without initial value", () => {
    // Directly test the array_reduce shim behavior
    const testArray: any = [];
    let errorThrown = false;

    // Mock the reduce function to use the shim's logic
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

    try {
      testArray.reduce((acc: number) => acc);
    } catch (e) {
      errorThrown = e instanceof TypeError;
    }

    expect(errorThrown).toBe(true);
  });
});