import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick behavior", () => {
  it("should correctly schedule tasks using nextTick without errors when process is manipulated", async () => {
    // The mutation changes `typeof process === "object"` to `true`
    // In Node.js, process IS an object, so both behave the same normally
    // We test that Q.nextTick works correctly - if the mutation causes issues
    // with process detection, tasks should still execute properly
    
    const results: number[] = [];
    
    await new Promise<void>((resolve) => {
      Q.nextTick(function() {
        results.push(1);
        Q.nextTick(function() {
          results.push(2);
          resolve();
        });
      });
    });
    
    expect(results).toEqual([1, 2]);
  });
});