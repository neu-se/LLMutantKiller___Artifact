import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick flushing", () => {
  it("should process tasks queued during an active flush without calling requestTick again", async () => {
    // The mutation changes `if (!flushing)` to `if (false)`, meaning requestTick
    // is never called. We need to test that a promise chain actually resolves.
    // We create a chain where each step queues a new nextTick task,
    // requiring the flush mechanism to work correctly for all steps.
    
    const results: number[] = [];

    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Flush broken - only got results: ${results}`));
      }, 1000);

      // Queue many tasks to ensure the flush cycle must be triggered
      // The mutation means requestTick() is never called so nothing executes
      Q.resolve(1)
        .then((v: number) => { results.push(v); return v + 1; })
        .then((v: number) => { results.push(v); return v + 1; })
        .then((v: number) => { results.push(v); return v + 1; })
        .then((v: number) => {
          results.push(v);
          clearTimeout(timeout);
          resolve();
        });
    });

    expect(results).toEqual([1, 2, 3, 4]);
  });
});