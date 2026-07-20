import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.del", () => {
  it("should actually delete the property from the object when using Q['delete']", async () => {
    const object: { a?: number; b: number } = { a: 10, b: 20 };
    await Q["delete"](object, "a");
    // Give async operations time to complete
    await new Promise<void>((resolve) => setTimeout(resolve, 50));
    expect("a" in object).toBe(false);
    expect(object.b).toBe(20);
  });
});