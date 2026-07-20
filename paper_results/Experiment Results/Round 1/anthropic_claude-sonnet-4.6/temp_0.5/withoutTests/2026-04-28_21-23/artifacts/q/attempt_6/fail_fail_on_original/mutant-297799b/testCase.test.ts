import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("filtered stack should not contain test file frames", async () => {
    Q.longStackSupport = true;
    const deferred = Q.defer();
    deferred.reject(new Error("test"));
    const err = await deferred.promise.then(null, (e: any) => e);
    const stack: string = err?.stack || "";
    // Original: only (module.js: or (node.js: lines kept → no test file frames
    // Mutation: all non-internal lines kept → test file frames present
    expect(stack).not.toContain("testCase.test");
  });
});