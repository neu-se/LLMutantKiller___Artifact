import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_map collect mutation", () => {
  it("allSettled should return correct number of results matching input array length", async () => {
    const promises = [
      Q.resolve(1),
      Q.reject(new Error("err")),
      Q.resolve(3)
    ];

    const result = await Q.allSettled(promises);
    
    // With mutation, array_map returns empty collect array, so result length would be 0
    expect(result.length).toBe(3);
    expect(result[0]).toEqual({ state: "fulfilled", value: 1 });
  });
});