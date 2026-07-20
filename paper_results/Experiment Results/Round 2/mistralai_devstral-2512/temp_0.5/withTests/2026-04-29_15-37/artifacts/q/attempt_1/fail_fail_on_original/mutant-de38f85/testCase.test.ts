// Test case to detect the mutation in q.js where Promise.prototype.keys calls dispatch with an empty string instead of "keys"
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.keys mutation test", () => {
  it("should correctly call dispatch with 'keys' operation", async () => {
    const testObject = { a: 1, b: 2, c: 3 };
    const promise = Q(testObject);

    // The mutation changes dispatch("keys", []) to dispatch("", [])
    // This test verifies that keys() still works correctly by checking the returned keys
    const keys = await promise.keys();

    // Verify we get the expected keys
    expect(keys).toEqual(["a", "b", "c"]);
  });
});