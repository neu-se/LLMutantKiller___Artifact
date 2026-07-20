import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done", () => {
  it("should properly terminate a promise chain and handle errors", (done) => {
    let errorHandled = false;
    Q.onerror = (error) => {
      errorHandled = true;
      expect(error).toBe("test error");
      done();
    };

    const promise = Q.reject("test error");
    Q.done(promise, () => {}, (err) => {
      throw err;
    });
  });
});