import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.master inspect behavior", () => {
  it("should return the inspect result of the wrapped object", () => {
    const testObject = { value: 42 };
    const mastered = Q.master(testObject);
    const inspectResult = mastered.inspect();
    expect(inspectResult).toEqual({ state: "fulfilled", value: testObject });
  });
});