import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
  it("should resolve a basic promise and fulfill with the correct value", async () => {
    const result = await Q.Promise(function(resolve: (v: number) => void) {
      resolve(42);
    });
    expect(result).toBe(42);
  });
});