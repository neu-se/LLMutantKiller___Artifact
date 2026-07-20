import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promise", () => {
  it("should resolve with the value passed to the resolve callback", async () => {
    const result = await Q.promise(function (resolve: (value: number) => void) {
      resolve(42);
    });
    expect(result).toBe(42);
  });
});