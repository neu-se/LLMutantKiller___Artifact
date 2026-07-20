const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.race behavior", () => {
  it("should resolve when the first promise in the array fulfills", async () => {
    const fastPromise = Q.delay(50).thenResolve("fast");
    const slowPromise = Q.delay(200).thenResolve("slow");
    const result = await Q.race([fastPromise, slowPromise]);
    expect(result).toBe("fast");
  });
});