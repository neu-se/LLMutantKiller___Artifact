import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.any", () => {
  it("should delegate to Q.any with the promise as input array", (done) => {
    const promises = [Q.reject(new Error("fail")), Q.resolve(42)];
    const arrayPromise = Q(promises);
    
    arrayPromise.any().then((result: number) => {
      expect(result).toBe(42);
      done();
    }, (err: Error) => {
      done(err);
    });
  });
});