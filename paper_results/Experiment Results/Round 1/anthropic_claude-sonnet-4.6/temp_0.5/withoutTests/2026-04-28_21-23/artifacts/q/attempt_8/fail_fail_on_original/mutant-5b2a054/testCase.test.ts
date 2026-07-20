import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick flush continuation", () => {
  it("should schedule flush via setTimeout after task throws so queue continues", (done) => {
    jest.useFakeTimers();
    
    const results: number[] = [];
    let caughtError: Error | null = null;
    const err = new Error("throwing task");
    
    Q.nextTick(() => { throw err; });
    Q.nextTick(() => { results.push(1); });
    
    // The if(true) branch: re-throws synchronously AND schedules setTimeout(flush, 0)
    // With fake timers, the setTimeout(flush, 0) won't run until we advance
    
    try {
      jest.runAllTimers();
    } catch(e) {
      caughtError = e as Error;
    }
    
    jest.useRealTimers();
    
    // After running timers, the flush should have processed remaining tasks
    expect(caughtError).toBe(err);
    expect(results).toContain(1);
    done();
  });
});