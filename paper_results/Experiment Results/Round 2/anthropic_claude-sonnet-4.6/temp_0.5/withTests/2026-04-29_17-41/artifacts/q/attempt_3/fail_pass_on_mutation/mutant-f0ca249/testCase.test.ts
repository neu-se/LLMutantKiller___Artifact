describe("Q array_reduce polyfill sparse array handling", () => {
  it("should not hang when array_reduce polyfill processes arrays", (done) => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;

    jest.resetModules();

    let Q: any;
    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      Array.prototype.reduce = originalReduce;
    }

    // If the mutation (--index) is present, this will hang indefinitely
    // because the polyfill's do-while loop never terminates
    // We use a timeout to detect the hang
    const timeout = setTimeout(() => {
      done(new Error("Test timed out - likely infinite loop due to mutation"));
    }, 1000);

    Q.all([Q.resolve(1), Q.resolve(2)]).then((result: number[]) => {
      clearTimeout(timeout);
      expect(result).toEqual([1, 2]);
      done();
    }).catch((err: Error) => {
      clearTimeout(timeout);
      done(err);
    });
  });
});