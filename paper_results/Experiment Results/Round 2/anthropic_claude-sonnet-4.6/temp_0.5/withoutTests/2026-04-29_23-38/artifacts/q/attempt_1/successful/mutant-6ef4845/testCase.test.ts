import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise fallback dispatch", () => {
  it("should call fallback when operation is not in descriptor", async () => {
    const obj = { foo: "bar" };
    const mastered = Q.master(obj);
    
    // Q.get dispatches "get" operation - master's descriptor only has "isDef"
    // so it should use the fallback which dispatches to the underlying object
    const result = await Q.get(mastered, "foo");
    expect(result).toBe("bar");
  });
});