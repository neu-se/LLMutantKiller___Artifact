import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all behavior", () => {
  it("should resolve with an array of fulfilled values when given an array of promises", async () => {
    const promises = [Q.resolve(1), Q.resolve(2), Q.resolve(3)];
    const result = await Q.all(promises);
    expect(result).toEqual([1, 2, 3]);
  });
});