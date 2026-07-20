import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q basic functionality", () => {
  it("should fulfill a deferred promise and chain correctly", (done) => {
    const deferred = Q.defer();
    
    deferred.promise
      .then((value: number) => {
        expect(value).toBe(42);
        return value * 2;
      })
      .then((value: number) => {
        expect(value).toBe(84);
        done();
      })
      .fail((err: Error) => {
        done(err);
      });

    deferred.resolve(42);
  });
});