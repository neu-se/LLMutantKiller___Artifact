// Test case to detect the mutation in Q.race
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race behavior", () => {
  it("should resolve when the first promise in the array fulfills", async () => {
    const fastPromise = Q.delay(10).thenResolve("fast");
    const slowPromise = Q.delay(100).thenResolve("slow");
    
    const result = await Q.race([fastPromise, slowPromise]);
    
    expect(result).toBe("fast");
  });
});