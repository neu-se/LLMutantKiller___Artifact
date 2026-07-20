import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace capture", () => {
  it("should capture stack traces when errors are thrown", async () => {
    const error = new Error("Test error");
    const promise = Q.reject(error);
    const result = await promise.catch((e: Error) => e);
    expect(result.stack).toBeDefined();
    expect(result.stack).toContain("Test error");
  });
});