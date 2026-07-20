import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.keys() behavior", () => {
  it("should return object keys when called on a fulfilled promise", async () => {
    const testObject = { a: 1, b: 2, c: 3 };
    const keys = await Q(testObject).keys();
    expect(keys).toEqual(["a", "b", "c"]);
  });
});