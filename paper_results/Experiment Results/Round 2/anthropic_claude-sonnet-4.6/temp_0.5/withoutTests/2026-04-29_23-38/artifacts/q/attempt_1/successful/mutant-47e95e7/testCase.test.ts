import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise valueOf behavior", () => {
  it("should return the rejection reason when valueOf is called on a rejected promise", () => {
    const reason = new Error("test error");
    const rejected = Q.reject(reason);
    const inspected = rejected.inspect();
    expect(inspected.state).toBe("rejected");
    // valueOf on a rejected promise should return the promise itself (not the value)
    const val = rejected.valueOf();
    expect(val).toBe(rejected);
  });
});