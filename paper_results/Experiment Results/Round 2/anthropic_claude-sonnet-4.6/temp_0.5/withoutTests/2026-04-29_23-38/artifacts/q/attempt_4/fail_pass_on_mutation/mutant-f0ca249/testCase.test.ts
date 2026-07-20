import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly reduce messages when resolving a deferred promise that already has pending messages", async () => {
    // This test exercises the become() function which calls array_reduce(messages, fn, void 0)
    // with potentially multiple pending messages accumulated before resolution
    const deferred = Q.defer();
    
    // Queue up multiple .then() calls before resolving to accumulate messages
    const p1 = deferred.promise.then((v: number) => v + 1);
    const p2 = deferred.promise.then((v: number) => v * 2);
    const p3 = deferred.promise.then((v: number) => v - 1);
    
    deferred.resolve(10);
    
    const [r1, r2, r3] = await Q.all([p1, p2, p3]);
    expect(r1).toBe(11);
    expect(r2).toBe(20);
    expect(r3).toBe(9);
  });
});