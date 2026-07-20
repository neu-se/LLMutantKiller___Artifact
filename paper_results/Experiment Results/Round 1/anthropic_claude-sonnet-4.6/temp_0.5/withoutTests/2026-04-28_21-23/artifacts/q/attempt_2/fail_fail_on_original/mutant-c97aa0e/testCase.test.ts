import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.any", () => {
  it("should resolve with the first fulfilled value when called on a promise of an array", (done) => {
    const promises = [Q.reject(new Error("fail")), Q.resolve(42)];
    const arrayPromise = Q(promises);

    const result = arrayPromise.any();

    expect(result).toBeDefined();
    expect(typeof result.then).toBe("function");

    result.then(
      (value: number) => {
        expect(value).toBe(42);
        done();
      },
      (err: Error) => {
        done(err);
      }
    );
  });
});