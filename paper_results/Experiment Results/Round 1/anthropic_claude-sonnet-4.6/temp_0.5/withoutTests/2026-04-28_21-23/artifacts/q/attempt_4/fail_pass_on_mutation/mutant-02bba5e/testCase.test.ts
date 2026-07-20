import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong with null error", () => {
  it("rejection reason should be exactly null, not a TypeError", async () => {
    const result = await new Promise<{type: string, reason: any}>((resolve) => {
      // Use a chain: first rejection with null, then catch the reason from the SECOND then
      Q.reject(null).then(
        undefined,
        (reason: any) => {
          // In original: reason is null, return it fulfilled
          // In mutated: makeStackTraceLong throws TypeError, promiseDispatch catches it,
          // so this handler receives TypeError instead of null
          return reason; // return the reason as fulfillment value
        }
      ).then(
        (value: any) => resolve({type: "fulfilled", reason: value}),
        (err: any) => resolve({type: "rejected", reason: err})
      );
    });

    expect(result.type).toBe("fulfilled");
    expect(result.reason).toBeNull();
  });
});