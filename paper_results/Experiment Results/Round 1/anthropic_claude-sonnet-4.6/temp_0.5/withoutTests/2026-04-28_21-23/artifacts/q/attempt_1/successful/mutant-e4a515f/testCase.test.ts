import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promise with valid resolver function", () => {
  it("should resolve when given a valid resolver function", async () => {
    // In the original code, if (typeof resolver !== "function") only triggers for non-functions
    // In the mutated code, if (true) always triggers, breaking valid function resolvers
    const result = await Q.promise(function (resolve: (value: number) => void) {
      resolve(42);
    });
    
    expect(result).toBe(42);
  });
});