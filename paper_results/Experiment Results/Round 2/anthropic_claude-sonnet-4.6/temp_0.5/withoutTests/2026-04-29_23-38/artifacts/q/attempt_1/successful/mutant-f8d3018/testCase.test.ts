import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q progress notification", () => {
  it("should call the progressed function when progress is notified", async () => {
    const progressValues: number[] = [];
    
    const deferred = Q.defer();
    
    const promise = deferred.promise.then(
      (value: number) => value,
      undefined,
      (progress: number) => {
        progressValues.push(progress * 2); // transform the progress value
        return progress * 2;
      }
    );
    
    // Notify progress
    deferred.notify(5);
    deferred.notify(10);
    
    // Resolve the promise
    deferred.resolve(42);
    
    await promise;
    
    // Wait a tick for progress to propagate
    await new Promise(resolve => Q.nextTick(resolve));
    await new Promise(resolve => Q.nextTick(resolve));
    
    // In the original code, the progressed function is called and returns progress * 2
    // In the mutated code, `typeof progressed === "function"` is replaced with `false`,
    // so the progressed function is never called, and the raw value is returned instead
    // The progressValues array should contain transformed values [10, 20] in original code
    // but [] in mutated code (since the function is never called)
    expect(progressValues).toEqual([10, 20]);
  });
});