import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.any", () => {
  it("should return a promise (not undefined) when calling .any() on a Q promise", (done) => {
    const result = Q.resolve([Q.resolve(1), Q.resolve(2)]).any();
    expect(result).toBeDefined();
    expect(typeof result.then).toBe("function");
    result.then(
      (value: number) => {
        expect(value).toBe(1);
        done();
      },
      (err: Error) => {
        done(err);
      }
    );
  });
});