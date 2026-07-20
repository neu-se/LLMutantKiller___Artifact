import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce fallback", () => {
  it("should handle Q.all correctly when Array.prototype.reduce is unavailable at module load time", (done) => {
    const originalReduce = Array.prototype.reduce;
    (Array.prototype as any).reduce = undefined;
    delete (Array.prototype as any).reduce;

    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");

    Array.prototype.reduce = originalReduce;

    QFresh.all([QFresh(1), QFresh(2), QFresh(3)]).then((values: number[]) => {
      expect(values).toEqual([1, 2, 3]);
      done();
    }, (err: Error) => {
      done(err);
    });
  });
});