import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.progress", () => {
  it("should forward progress notifications to the progressed callback", async () => {
    const progressValues: number[] = [];
    
    const deferred = Q.defer();
    
    const promise = Q.progress(deferred.promise, function (value: number) {
      progressValues.push(value);
    });
    
    deferred.notify(1);
    deferred.notify(2);
    deferred.resolve(42);
    
    await promise;
    
    expect(progressValues).toEqual([1, 2]);
  });
});