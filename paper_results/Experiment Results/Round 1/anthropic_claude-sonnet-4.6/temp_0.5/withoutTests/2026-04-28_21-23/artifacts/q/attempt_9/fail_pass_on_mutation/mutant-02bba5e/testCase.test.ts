import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q null rejection", () => {
  it("rejection with null should not result in TypeError", async () => {
    const reasons: any[] = [];
    
    // Chain multiple .then calls to catch any TypeError that might propagate
    await Q.reject(null)
      .then(undefined, (r: any) => { reasons.push({step: 1, r}); return r; })
      .then(undefined, (r: any) => { reasons.push({step: 2, r}); })
      .then(() => {});
    
    expect(reasons).toHaveLength(1);
    expect(reasons[0]).toEqual({step: 1, r: null});
  });
});