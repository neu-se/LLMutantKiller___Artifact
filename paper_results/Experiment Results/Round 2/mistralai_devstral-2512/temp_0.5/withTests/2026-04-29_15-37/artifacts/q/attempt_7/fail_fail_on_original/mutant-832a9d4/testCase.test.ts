import Q from "../../../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise resolution timing", () => {
    it("should resolve promises quickly with efficient nextTick", (done) => {
        const startTime = Date.now();
        let resolvedCount = 0;
        const totalPromises = 10;

        // Create and resolve multiple promises
        for (let i = 0; i < totalPromises; i++) {
            Q.resolve().then(() => {
                resolvedCount++;
                if (resolvedCount === totalPromises) {
                    const duration = Date.now() - startTime;
                    if (duration < 50) {
                        done();
                    } else {
                        done(new Error(`Promises resolved too slowly (${duration}ms)`));
                    }
                }
            });
        }

        // Safety timeout
        setTimeout(() => {
            done(new Error(`Test timed out - only ${resolvedCount} promises resolved`));
        }, 200);
    });
});