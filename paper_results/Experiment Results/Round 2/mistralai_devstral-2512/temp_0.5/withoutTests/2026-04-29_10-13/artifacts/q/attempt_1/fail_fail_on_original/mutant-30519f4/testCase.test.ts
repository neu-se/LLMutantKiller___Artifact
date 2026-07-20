import { Q } from "./q.js";

describe("Q.all behavior with fulfilled promises", () => {
  it("should resolve immediately when all promises are already fulfilled", async () => {
    const fulfilledPromises = [
      Q.resolve(1),
      Q.resolve(2),
      Q.resolve(3)
    ];

    const result = await Q.all(fulfilledPromises);
    expect(result).toEqual([1, 2, 3]);
  });
});