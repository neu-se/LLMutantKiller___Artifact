import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any behavior with empty array", () => {
  it("should fulfill when passed an empty array", async () => {
    const promise = Q.any([]);
    await expect(promise).resolves.toBeUndefined();
  });
});