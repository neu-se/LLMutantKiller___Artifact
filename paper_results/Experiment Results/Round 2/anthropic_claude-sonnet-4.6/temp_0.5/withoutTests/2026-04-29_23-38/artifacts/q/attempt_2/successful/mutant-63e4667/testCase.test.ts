import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.keys", () => {
  it("should dispatch keys operation with empty args array", async () => {
    let capturedArgs: any[] | undefined;

    const customPromise = Q.makePromise(
      {},
      function fallback(op: string, args: any[]) {
        if (op === "keys") {
          capturedArgs = args;
          return Q([]);
        }
        return Q.reject(new Error("unexpected op: " + op));
      },
      function inspect() {
        return { state: "pending" as const };
      }
    );

    await customPromise.keys();
    expect(capturedArgs).toEqual([]);
  });
});