import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should handle promise rejection correctly", () => {
    const reason = new Error("test error");
    return Q.reject(reason).then(
      () => { throw new Error("should not fulfill"); },
      (err: Error) => { expect(err).toBe(reason); }
    );
  });
});