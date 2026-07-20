// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-6ee5386/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise rejection behavior", () => {
  it("should correctly handle thrown errors in promise chains and track the threw flag", async () => {
    let threw = false;
    const deferred = Q.defer();
    const errorHandler = jest.fn();
    Q.when(deferred.promise, function () {
      threw = true;
      throw new Error("Test error");
    });
    const promise = Q.when(deferred.promise, function (value: number) {
      expect(value).toEqual(10);
    }, errorHandler);
    deferred.resolve(10);
    await promise;
    expect(threw).toBe(true);
    expect(errorHandler).toHaveBeenCalled();
  });
});