import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandledRejection tracking", () => {
  it("should emit unhandledRejection event on process when a rejection is unhandled", (done) => {
    const reason = new Error("test rejection");
    let emitted = false;

    const handler = (rejectionReason: any, promise: any) => {
      if (rejectionReason === reason) {
        emitted = true;
      }
    };

    process.on("unhandledRejection", handler);

    // Create a rejected promise that is never handled
    Q.reject(reason);

    // Wait long enough for the async tracking to fire
    setTimeout(() => {
      process.removeListener("unhandledRejection", handler);
      expect(emitted).toBe(true);
      done();
    }, 100);
  });
});