import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.master inspect", () => {
  it("should return the inspect result of the wrapped object when inspect is called on a mastered promise", () => {
    const obj = { foo: "bar" };
    const mastered = Q.master(obj);
    const inspected = mastered.inspect();
    expect(inspected).toEqual({ state: "fulfilled", value: obj });
  });
});