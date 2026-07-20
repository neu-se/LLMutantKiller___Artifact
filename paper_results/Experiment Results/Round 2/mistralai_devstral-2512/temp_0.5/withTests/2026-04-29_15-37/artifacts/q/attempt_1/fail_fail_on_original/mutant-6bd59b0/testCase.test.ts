import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get() method", () => {
  it("should correctly dispatch 'get' operation to retrieve property value", async () => {
    const obj = { foo: "bar" };
    const promise = Q(obj);
    const result = await promise.get("foo");
    expect(result).toBe("bar");
  });
});