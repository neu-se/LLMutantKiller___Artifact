import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
  it("should resolve with the first fulfilled promise value", async () => {
    const promises = [
      Q.reject(new Error("first rejection")),
      Q.resolve(42),
      Q.resolve(100),
    ];

    const result = await Q.any(promises);
    expect(result).toBe(42);
  });
});