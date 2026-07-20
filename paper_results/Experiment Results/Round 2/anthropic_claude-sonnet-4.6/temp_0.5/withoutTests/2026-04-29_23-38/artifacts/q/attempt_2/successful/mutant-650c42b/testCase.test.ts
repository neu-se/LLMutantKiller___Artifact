import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("dispatch function", () => {
  it("should forward operations through Q.master to the underlying object", async () => {
    const obj = { name: "test", getValue: () => 42 };
    const mastered = Q.master(obj);
    // Q.master uses the internal dispatch function as its fallback
    // When we call .get on a mastered object, it goes through the fallback
    // which calls dispatch(object, op, args)
    const result = await mastered.dispatch("get", ["name"]);
    expect(result).toBe("test");
  });
});