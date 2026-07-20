import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce internal behavior via Q.all", () => {
  it("correctly reduces promises array and resolves all values", async () => {
    // This exercises array_reduce which is used internally by Q.all
    // The mutation affects the fallback reduce implementation's initialization
    // of basis from the first array element when no initial value is provided
    const results = await Q.all([
      Q.resolve(1),
      Q.resolve(2),
      Q.resolve(3),
    ]);
    expect(results).toEqual([1, 2, 3]);

    // Also test with a single element array to stress the basis initialization
    const single = await Q.all([Q.resolve(42)]);
    expect(single).toEqual([42]);

    // Test that allSettled (which uses array_map which uses array_reduce) works
    const settled = await Q.allSettled([
      Q.resolve("a"),
      Q.reject(new Error("b")),
      Q.resolve("c"),
    ]);
    expect(settled[0]).toEqual({ state: "fulfilled", value: "a" });
    expect(settled[1].state).toBe("rejected");
    expect(settled[2]).toEqual({ state: "fulfilled", value: "c" });
  });
});