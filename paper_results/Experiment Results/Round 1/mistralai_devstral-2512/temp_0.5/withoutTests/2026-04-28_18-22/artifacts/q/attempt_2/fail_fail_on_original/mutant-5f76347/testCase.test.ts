import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delete mutation test", () => {
  it("should pass the key to the delete operation", async () => {
    const obj = { testKey: "testValue" };
    const promise = Q(obj);

    // Spy on the dispatch method to verify the arguments
    const dispatchSpy = jest.spyOn(promise, "dispatch");

    await promise.del("testKey");

    // Verify that dispatch was called with the correct key
    expect(dispatchSpy).toHaveBeenCalledWith("delete", ["testKey"]);
    dispatchSpy.mockRestore();
  });
});