import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay function", () => {
    it("should delay the resolution of a promise", () => {
        const timeout = 100;
        const promise = Q.delay(Promise.resolve("test"), timeout);
        let resolved = false;
        promise.then(() => {
            resolved = true;
        });
        expect(resolved).toBe(false);
        // Since Jest uses a fake timer, we need to use jest.runAllTimers() to advance the timer.
        jest.runAllTimers();
        expect(resolved).toBe(true);
    });
});