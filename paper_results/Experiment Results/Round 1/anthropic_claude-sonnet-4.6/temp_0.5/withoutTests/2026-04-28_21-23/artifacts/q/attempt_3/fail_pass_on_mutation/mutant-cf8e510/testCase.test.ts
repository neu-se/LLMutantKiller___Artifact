import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation detection", () => {
  it("does not modify error stack when longStackSupport is false", async () => {
    Q.longStackSupport = false;

    const error = new Error("original error");
    const originalStack = error.stack;

    const caughtError: Error = await Q.reject(error).then(null, (e: Error) => e);

    expect(caughtError.stack).toBe(originalStack);
  });
});