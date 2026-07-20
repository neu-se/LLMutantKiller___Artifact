import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("allSettled with array_map", () => {
  it("should correctly map promises in allSettled, returning proper state objects for each element", async () => {
    const result = await Q.allSettled([Q.resolve(1), Q.resolve(2), Q.resolve(3)]);
    expect(result).toEqual([
      { state: "fulfilled", value: 1 },
      { state: "fulfilled", value: 2 },
      { state: "fulfilled", value: 3 },
    ]);
  });
});