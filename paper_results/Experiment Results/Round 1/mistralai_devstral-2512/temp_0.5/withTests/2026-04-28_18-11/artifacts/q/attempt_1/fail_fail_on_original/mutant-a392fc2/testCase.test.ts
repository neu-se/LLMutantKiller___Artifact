import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("finally callback validation", () => {
  it("should reject with error when callback is not a function", async () => {
    const promise = Q.resolve(42);
    let error: Error | null = null;

    try {
      await promise.fin(123 as any);
    } catch (err) {
      error = err as Error;
    }

    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe("Q can't apply finally callback");
  });
});