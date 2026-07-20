import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf shim correctness", () => {
  it("should handle a rejected promise that is subsequently caught without hanging", async () => {
    // array_indexOf is used in untrackRejection to find a promise in the
    // unhandledRejections array. With the mutation (i-- instead of i++),
    // the loop becomes infinite when the array is non-empty.
    //
    // We create a rejected promise and then handle it, which triggers
    // untrackRejection -> array_indexOf on a non-empty array.
    // On original code: completes normally.
    // On mutated code: infinite loop causes test timeout.

    const result = await Q.reject(new Error("intentional rejection"))
      .then(
        () => "fulfilled",
        () => "caught"
      );

    expect(result).toBe("caught");
  });
});