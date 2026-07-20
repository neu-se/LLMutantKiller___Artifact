import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking - splice behavior", () => {
  it("reports unhandled rejections correctly after resetUnhandledRejections is called and new rejections are created", () => {
    Q.resetUnhandledRejections();

    const reason1 = "reason one";
    const reason2 = "reason two";

    Q.reject(reason1);
    Q.reject(reason2);

    const reasons = Q.getUnhandledReasons();
    expect(reasons).toContain("(no stack) " + reason1);
    expect(reasons).toContain("(no stack) " + reason2);
    expect(reasons.length).toEqual(2);
  });
});