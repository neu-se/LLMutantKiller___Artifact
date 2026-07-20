import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should fulfill promise with correct value through then chain", async () => {
    const d = Q.defer();
    d.resolve(42);
    const result = await d.promise.then((v: number) => v * 2);
    expect(result).toBe(84);
  });
});