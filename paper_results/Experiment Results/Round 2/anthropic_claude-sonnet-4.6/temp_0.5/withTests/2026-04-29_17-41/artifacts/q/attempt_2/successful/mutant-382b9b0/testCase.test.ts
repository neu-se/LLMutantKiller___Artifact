import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nodeify static function", () => {
  it("should call the nodeback with null and the resolved value when called as Q.nodeify(promise, callback)", (done) => {
    Q.nodeify(Q(99), function (err: any, value: any) {
      expect(err).toBeNull();
      expect(value).toBe(99);
      done();
    });
  });
});