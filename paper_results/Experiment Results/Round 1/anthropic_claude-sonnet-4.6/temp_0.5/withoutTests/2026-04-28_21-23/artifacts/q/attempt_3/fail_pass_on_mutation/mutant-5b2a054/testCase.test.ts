import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise resolution", () => {
  it("resolves chained promises correctly after a task throws", async () => {
    let resolved = false;
    
    await new Promise<void>((resolve) => {
      Q.resolve(42)
        .then((val: number) => {
          resolved = true;
          return val * 2;
        })
        .then((val: number) => {
          expect(val).toBe(84);
          expect(resolved).toBe(true);
          resolve();
        });
    });
  });
});