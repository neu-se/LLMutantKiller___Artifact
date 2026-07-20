// Test case to detect the mutation in Q.any()
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any() mutation test", () => {
  it("should fulfill when passed an empty array", async () => {
    const result = await Q.any([]);
    expect(result).toBeUndefined();
  });
});