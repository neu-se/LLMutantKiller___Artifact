import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_map shim collect initialization", () => {
  it("allSettled maps promises correctly including rejected ones", async () => {
    const err = new Error("fail");
    const result = await Q.allSettled([Q(1), Q.reject(err), Q(3)]);
    expect(result.length).toBe(3);
    expect(result[0]).toEqual({ state: "fulfilled", value: 1 });
    expect(result[1]).toEqual({ state: "rejected", reason: err });
    expect(result[2]).toEqual({ state: "fulfilled", value: 3 });
  });
});