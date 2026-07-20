import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise fallback dispatch", () => {
  it("should use the fallback function when the operation is not in the descriptor", () => {
    const obj = { foo: 42 };
    const masterPromise = Q.master(obj);

    return masterPromise.get("foo").then((value: unknown) => {
      expect(value).toBe(42);
    });
  });
});