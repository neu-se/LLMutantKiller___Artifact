import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise descriptor exception handling", () => {
  it("should propagate rejection when descriptor method throws", async () => {
    const error = new Error("descriptor threw");

    // Create a promise using Q.makePromise with a descriptor whose "get" method throws
    const p = Q.makePromise({
      "get": function() {
        throw error;
      }
    });

    // Use Q.get which dispatches "get" operation through promiseDispatch
    // Original: result = reject(exception), resolve(reject(exception)) -> rejected promise
    // Mutated: result = undefined, resolve(undefined) -> fulfilled with undefined
    const outcome = await Q.get(p, "someKey").then(
      (value: any) => ({ type: "fulfilled", value }),
      (reason: any) => ({ type: "rejected", reason })
    );

    expect(outcome.type).toBe("rejected");
    expect((outcome as any).reason).toBe(error);
  });
});