import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("removes a rejection from unhandled reasons once it is handled via catch", () => {
    Q.resetUnhandledRejections();

    const reason = new Error("test error");
    const p = Q.reject(reason);

    expect(Q.getUnhandledReasons().length).toEqual(1);

    return p.catch(function () {
      // handled
    }).then(function () {
      expect(Q.getUnhandledReasons().length).toEqual(0);
    });
  });
});