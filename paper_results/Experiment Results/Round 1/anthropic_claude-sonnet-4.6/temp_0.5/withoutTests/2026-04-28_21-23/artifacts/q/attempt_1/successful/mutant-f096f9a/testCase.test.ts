import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
  it("should resolve with the value of the first fulfilled promise", async () => {
    const promises = [
      Q.reject(new Error("first rejection")),
      Q.resolve(42),
      Q.reject(new Error("third rejection")),
    ];

    const result = await Q.any(promises);
    expect(result).toBe(42);
  });
});