import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("promise rejection handling", () => {
  it("correctly handles rejected promises through then with errback", () => {
    const error = new Error("test");
    return Q.reject(error).then(
      null,
      function(err: Error) {
        expect(err).toBe(error);
      }
    );
  });
});