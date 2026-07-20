import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.del", () => {
  it("should delete a property from an object using Q.del", async () => {
    const object = { a: 10, b: 20 };
    const result = await Q.fcall(() => object).del("a");
    expect("a" in object).toBe(false);
    expect(result).toBe(undefined);
  });
});