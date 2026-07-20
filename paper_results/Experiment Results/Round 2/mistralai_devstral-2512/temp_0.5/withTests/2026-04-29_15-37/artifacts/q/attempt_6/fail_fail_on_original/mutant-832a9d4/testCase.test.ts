import Q from "../../../../../../../../../../../../../subject_repositories/q/q.js";

describe("nextTick implementation behavior", () => {
    it("should maintain proper task ordering with rapid scheduling", (done) => {
        const results: number[] = [];
        const expectedOrder = Array.from({length: 20}, (_, i) => i);

        // Schedule tasks in rapid succession
        for (let i = 0; i < 20; i++) {
            Q.nextTick(() => {
                results.push(i);
                if (results.length === 20) {
                    try {
                        expect(results).toEqual(expectedOrder);
                        done();
                    } catch (e) {
                        done(e);
                    }
                }
            });
        }

        // Safety timeout
        setTimeout(() => {
            done(new Error(`Test timed out - only ${results.length} tasks completed`));
        }, 500);
    });
});