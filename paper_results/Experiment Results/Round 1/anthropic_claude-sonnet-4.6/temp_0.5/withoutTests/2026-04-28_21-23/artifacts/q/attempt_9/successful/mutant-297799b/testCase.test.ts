import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("with long stack support, filtered stack should contain non-node frames", async () => {
    Q.longStackSupport = true;
    const deferred = Q.defer();
    deferred.reject(new Error("test"));
    const err = await deferred.promise.then(null, (e: any) => e);
    const stack: string = err?.stack || "";
    // Original: filterStackString keeps non-node frames (user code) → non-empty
    // Mutation (isNodeFrame always true): !true = false → nothing kept → empty
    expect(stack).not.toBe("");
  });
});