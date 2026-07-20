import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("allSettled with array_map", () => {
  it("should correctly map promises in allSettled, returning all settled states", async () => {
    const result = await Q.allSettled([Q(1), Q(2), Q(3)]);
    expect(result).toEqual([
      { state: "fulfilled", value: 1 },
      { state: "fulfilled", value: 2 },
      { state: "fulfilled", value: 3 },
    ]);
  });
});