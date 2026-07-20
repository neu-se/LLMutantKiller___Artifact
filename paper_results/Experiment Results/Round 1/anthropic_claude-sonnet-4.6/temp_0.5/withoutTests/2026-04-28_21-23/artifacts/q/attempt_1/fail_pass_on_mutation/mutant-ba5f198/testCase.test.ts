import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise basic resolution", () => {
  it("should resolve a deferred promise and chain then callbacks correctly", async () => {
    const deferred = Q.defer();
    
    const results: number[] = [];
    
    const p1 = deferred.promise.then((value: number) => {
      results.push(value);
      return value + 1;
    }).then((value: number) => {
      results.push(value);
      return value + 1;
    });
    
    deferred.resolve(1);
    
    await new Promise<void>((resolve) => {
      p1.then(() => {
        resolve();
      });
    });
    
    expect(results).toEqual([1, 2]);
  });
});