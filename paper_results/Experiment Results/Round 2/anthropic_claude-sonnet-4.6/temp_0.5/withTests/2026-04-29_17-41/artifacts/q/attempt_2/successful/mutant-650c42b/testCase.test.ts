import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("master dispatch fallback", () => {
  it("should correctly dispatch operations on master-wrapped objects via the internal dispatch function", async () => {
    const obj = { name: "hello" };
    const masterPromise = Q.master(obj);
    // Calling .get() on a master-wrapped object triggers the fallback which calls internal dispatch()
    const result = await masterPromise.get("name");
    expect(result).toBe("hello");
  });
});