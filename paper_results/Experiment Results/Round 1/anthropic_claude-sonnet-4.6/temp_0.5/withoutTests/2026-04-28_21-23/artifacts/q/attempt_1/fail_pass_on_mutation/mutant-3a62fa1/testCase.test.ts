import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick process check", () => {
  it("should resolve promises correctly using nextTick mechanism", async () => {
    // The mutation changes `typeof process === "object"` to `true`
    // In Node.js, process IS an object, so both conditions are true
    // However, we can test that Q.nextTick works and promises resolve
    // by verifying the basic promise chain behavior
    
    const results: number[] = [];
    
    await new Promise<void>((done) => {
      Q.resolve(1)
        .then((v: number) => {
          results.push(v);
          return v + 1;
        })
        .then((v: number) => {
          results.push(v);
          done();
        });
    });
    
    expect(results).toEqual([1, 2]);
  });
});