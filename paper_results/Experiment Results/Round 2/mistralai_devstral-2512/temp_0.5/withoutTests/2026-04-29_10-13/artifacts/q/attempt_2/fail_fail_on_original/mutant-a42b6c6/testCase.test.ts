import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.makeNodeResolver", () => {
  it("should reject the promise when an error is provided", (done) => {
    const deferred = Q.defer();
    const nodeResolver = deferred.makeNodeResolver();

    // Simulate a Node.js callback with an error
    nodeResolver(new Error("Test error"));

    deferred.promise.then(
      () => {
        done(new Error("Promise should have been rejected"));
      },
      (error: Error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Test error");
        done();
      }
    );
  });
});