import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.join behavior", () => {
  it("should reject when x and y are not equal", async () => {
    const x = 42;
    const y = 43;
    const promise = Q.join(x, y);
    await expect(promise).rejects.toBeDefined();
  });
});