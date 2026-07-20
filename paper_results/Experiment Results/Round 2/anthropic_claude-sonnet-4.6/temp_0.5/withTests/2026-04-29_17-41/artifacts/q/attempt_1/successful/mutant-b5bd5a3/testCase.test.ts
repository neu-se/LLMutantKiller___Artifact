import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise exception property", () => {
  it("should set the exception property on a rejected promise created via Q.makePromise", () => {
    const reason = new Error("test rejection reason");
    const rejectedPromise = Q.makePromise(
      {
        when: function (rejected: any) {
          return rejected ? rejected(reason) : this;
        }
      },
      function fallback() {
        return this;
      },
      function inspect() {
        return { state: "rejected", reason: reason };
      }
    );

    expect((rejectedPromise as any).exception).toBe(reason);
  });
});