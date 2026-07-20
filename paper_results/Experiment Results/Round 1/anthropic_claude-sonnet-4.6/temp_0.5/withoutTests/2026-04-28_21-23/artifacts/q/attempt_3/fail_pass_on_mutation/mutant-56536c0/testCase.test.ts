import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise resolution", () => {
  it("should resolve nested promises in correct order", async () => {
    const log: number[] = [];
    
    await Q.Promise((resolve: Function) => {
      Q.nextTick(() => {
        log.push(1);
        Q.nextTick(() => {
          log.push(2);
          resolve(log);
        });
      });
    });
    
    expect(log).toEqual([1, 2]);
  });
});