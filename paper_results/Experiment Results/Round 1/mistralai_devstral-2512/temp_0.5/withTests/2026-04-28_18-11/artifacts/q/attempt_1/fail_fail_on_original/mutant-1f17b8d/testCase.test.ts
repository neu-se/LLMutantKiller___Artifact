import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all mutation test", () => {
  it("should resolve all promises and modify the input array", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const promises = [deferred1.promise, deferred2.promise];

    // Resolve promises after a short delay to ensure async behavior
    setTimeout(() => {
      deferred1.resolve(10);
      deferred2.resolve(20);
    }, 10);

    const result = await Q.all(promises);

    // Verify the result contains the resolved values
    expect(result).toEqual([10, 20]);

    // Verify the input array was modified (this is the key behavior that the mutation breaks)
    expect(promises).toEqual([10, 20]);
    expect(promises).toBe(result); // Should be the same array reference
  });
});