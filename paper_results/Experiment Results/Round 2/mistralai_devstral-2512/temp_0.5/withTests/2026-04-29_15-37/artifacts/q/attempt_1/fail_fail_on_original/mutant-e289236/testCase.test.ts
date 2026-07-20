import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("defer valueOf test", () => {
  it("should have valueOf return undefined for pending promises", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    expect(promise.valueOf()).toBeUndefined();
  });
});