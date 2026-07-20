import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("allResolved uses array_map correctly", () => {
  it("should return all promises wrapped with Q when using allResolved", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    deferred1.resolve(42);
    deferred2.resolve(99);

    const result = await Q.allResolved([deferred1.promise, deferred2.promise]);

    expect(result.length).toBe(2);
    expect(result[0].inspect()).toEqual({ state: "fulfilled", value: 42 });
    expect(result[1].inspect()).toEqual({ state: "fulfilled", value: 99 });
  });
});