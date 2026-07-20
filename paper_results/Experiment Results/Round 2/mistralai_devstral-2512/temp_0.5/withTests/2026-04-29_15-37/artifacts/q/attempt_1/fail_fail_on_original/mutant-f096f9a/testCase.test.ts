import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
  it("should resolve when given an empty array", async () => {
    const result = await Q.any([]);
    expect(result).toBeUndefined();
  });
});