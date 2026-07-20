import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nodeify", () => {
  it("should call the nodeback with null and the resolved value when promise fulfills", async () => {
    const result = await new Promise<{ error: any; value: any }>((resolve) => {
      const promise = Q.resolve(42);
      const returnValue = Q.nodeify(promise, function (error: any, value: any) {
        resolve({ error, value });
      });
      // If nodeify returns nothing (mutated), the nodeback should still be called
      // If nodeify is broken (mutated to empty function), the nodeback will never be called
    });

    expect(result.error).toBeNull();
    expect(result.value).toBe(42);
  });
});