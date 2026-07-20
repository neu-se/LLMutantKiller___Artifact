import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.makePromise fallback behavior", () => {
  it("should use fallback when operation is not in descriptor", (done) => {
    const promise = Q.makePromise(
      {},
      function (op: string) {
        return Promise.resolve(`fallback-${op}`);
      }
    );

    promise.dispatch("when", []).then((result: any) => {
      expect(result).toBe("fallback-when");
      done();
    });
  });
});