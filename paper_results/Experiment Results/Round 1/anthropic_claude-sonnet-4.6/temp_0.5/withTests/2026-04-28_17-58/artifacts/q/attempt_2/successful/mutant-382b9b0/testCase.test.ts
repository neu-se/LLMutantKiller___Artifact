import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nodeify static function", () => {
  it("should call nodeback with the resolved value when using Q.nodeify", (done) => {
    const result = Q.nodeify(Q(99), function (err: any, value: any) {
      expect(err).toBeNull();
      expect(value).toBe(99);
      done();
    });
    // If mutated, nodeback is never called and done() never fires, causing timeout
    // Also the return value should be undefined (no promise returned when nodeback provided)
    expect(result).toBeUndefined();
  });
});