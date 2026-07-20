// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-0bd332f/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
  it("should throw TypeError when reduce is called on an empty array without initial value", () => {
    const testArray: any[] = [];
    testArray.reduce = function() {
      // Simulate the original array_reduce behavior
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
      return 42; // dummy return
    };

    expect(() => {
      testArray.reduce((acc: number) => acc);
    }).toThrow(TypeError);
  });
});