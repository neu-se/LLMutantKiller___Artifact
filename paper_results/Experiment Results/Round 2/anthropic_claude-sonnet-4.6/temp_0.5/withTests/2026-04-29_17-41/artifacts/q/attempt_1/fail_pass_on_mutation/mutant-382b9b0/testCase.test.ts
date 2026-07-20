import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nodeify", () => {
  it("should call the nodeback with null and the resolved value when the promise is fulfilled", (done) => {
    Q(42).nodeify(function (err: any, value: any) {
      expect(err).toBeNull();
      expect(value).toBe(42);
      done();
    });
  });
});