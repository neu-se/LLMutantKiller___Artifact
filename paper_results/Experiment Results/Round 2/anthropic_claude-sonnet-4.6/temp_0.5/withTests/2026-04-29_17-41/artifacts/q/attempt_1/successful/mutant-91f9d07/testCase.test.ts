import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nfbind / Q.denodeify", () => {
  it("should return a function that wraps a node-style callback function when called with a valid callback", (done) => {
    const nodeStyleFn = function (a: number, b: number, callback: (err: Error | null, result?: number) => void) {
      callback(null, a + b);
    };

    const bound = Q.nfbind(nodeStyleFn, 3);
    const promise = bound(4);

    promise.then(
      function (result: number) {
        expect(result).toBe(7);
        done();
      },
      function (err: Error) {
        done(err);
      }
    );
  });
});