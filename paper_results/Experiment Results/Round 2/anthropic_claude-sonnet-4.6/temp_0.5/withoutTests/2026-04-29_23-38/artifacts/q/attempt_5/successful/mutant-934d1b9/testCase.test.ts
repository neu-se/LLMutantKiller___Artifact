import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.defer notify guard", () => {
  it("should not call progress listeners after promise is resolved", async () => {
    const deferred = Q.defer();
    const progressValues: number[] = [];
    
    deferred.promise.then(null, null, (val: number) => {
      progressValues.push(val);
    });
    
    deferred.notify(1);
    deferred.resolve("done");
    
    // In original: notify after resolve is ignored due to guard
    // In mutated: notify after resolve still fires
    deferred.notify(2);
    
    await deferred.promise;
    // Wait an extra tick for any pending notifications
    await Q.Promise((resolve: Function) => setTimeout(resolve, 50));
    
    expect(progressValues).toEqual([1]);
  });
});