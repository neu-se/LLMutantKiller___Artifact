import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q captureLine behavior", () => {
  it("should load Q module and resolve promises correctly, indicating captureLine works", async () => {
    const result = await Q.Promise((resolve: (v: number) => void) => resolve(42));
    expect(result).toBe(42);
  });
});