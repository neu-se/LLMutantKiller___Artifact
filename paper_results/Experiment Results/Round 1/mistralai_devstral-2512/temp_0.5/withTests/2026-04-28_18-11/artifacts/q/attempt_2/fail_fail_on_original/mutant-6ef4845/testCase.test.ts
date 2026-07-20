// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-6ef4845/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise descriptor fallback behavior", () => {
  it("should call fallback when operation is not defined in descriptor", () => {
    const descriptor = {
      when: function() {
        return Q.resolve("when result");
      }
    };

    const fallback = jest.fn(function(op: string, args: any[]) {
      return Q.resolve(`fallback called with op: ${op}`);
    });

    const promise = Q.makePromise(descriptor, fallback);

    return promise.dispatch("get", ["someKey"]).then((result: any) => {
      expect(fallback).toHaveBeenCalledWith("get", ["someKey"]);
      expect(result).toBe("fallback called with op: get");
    });
  });
});