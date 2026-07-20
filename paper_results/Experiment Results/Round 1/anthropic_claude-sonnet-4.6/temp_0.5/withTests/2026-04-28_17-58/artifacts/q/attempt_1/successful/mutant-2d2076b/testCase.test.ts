import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay single argument behavior", () => {
  it("should return a pending promise when called with only a timeout argument", () => {
    const promise = Q.delay(200);

    // The promise should still be pending immediately after creation
    expect(promise.isPending()).toBe(true);

    // And it should eventually fulfill (not reject)
    return promise.then((value: unknown) => {
      expect(value).toBeUndefined();
    });
  });
});