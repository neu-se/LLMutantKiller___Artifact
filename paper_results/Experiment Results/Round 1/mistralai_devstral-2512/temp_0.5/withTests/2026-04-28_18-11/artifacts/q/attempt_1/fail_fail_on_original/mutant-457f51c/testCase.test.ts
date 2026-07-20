import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior on rejected promises", () => {
  it("should not expose exception property for rejected promises", () => {
    const error = new Error("Test error");
    const rejectedPromise = Q.reject(error);

    // The mutation changes the condition from checking the state to always true
    // This test verifies that the exception property is not exposed incorrectly
    expect(rejectedPromise.exception).toBeUndefined();
  });
});