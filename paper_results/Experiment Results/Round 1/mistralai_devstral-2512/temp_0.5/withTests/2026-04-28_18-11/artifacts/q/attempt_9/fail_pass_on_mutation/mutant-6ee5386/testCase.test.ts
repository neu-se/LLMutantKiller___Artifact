// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-6ee5386/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise rejection behavior", () => {
  it("should correctly track thrown errors in promise chains", async () => {
    let threw = false;
    const deferred = Q.defer();
    Q.when(deferred.promise, function () {
      threw = true;
      throw new Error("Test error");
    });
    const promise = Q.when(deferred.promise, function (value: number) {
      expect(value).toEqual(10);
    }, function (error: Error) {
      expect(error.message).toEqual("Test error");
    });
    deferred.resolve(10);
    await promise;
    expect(threw).toBe(true);
  });
});