import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise basic functionality", () => {
  it("should resolve promises asynchronously and chain correctly", async () => {
    const results: number[] = [];

    await new Promise<void>((done) => {
      Q.resolve(1)
        .then((val: number) => {
          results.push(val);
          return val + 1;
        })
        .then((val: number) => {
          results.push(val);
          return val + 1;
        })
        .then((val: number) => {
          results.push(val);
          done();
        });
    });

    expect(results).toEqual([1, 2, 3]);
  });
});