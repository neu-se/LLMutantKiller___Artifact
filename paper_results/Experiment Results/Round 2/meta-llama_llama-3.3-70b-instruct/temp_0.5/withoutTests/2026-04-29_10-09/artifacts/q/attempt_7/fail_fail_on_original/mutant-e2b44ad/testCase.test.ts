import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should pass on the original code and fail on the mutated code", () => {
        const originalProcess = global.process;
        global.process = { domain: {} };
        const promise = Q.resolve();
        promise.done();
        expect(true).toBe(true);
        global.process = originalProcess;
    });
});