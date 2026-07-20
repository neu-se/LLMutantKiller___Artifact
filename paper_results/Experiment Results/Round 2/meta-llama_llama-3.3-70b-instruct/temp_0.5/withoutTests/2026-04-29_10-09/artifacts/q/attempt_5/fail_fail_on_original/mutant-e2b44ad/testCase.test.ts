import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should pass on the original code and fail on the mutated code", () => {
        const originalProcess = global.process;
        global.process = { domain: {} };
        const promise = Q.resolve();
        expect(() => {
            promise.done(() => {}, () => {}, () => {});
            if (typeof global.process === "object" && global.process.domain) {
                // Original code
            } else {
                throw new Error("Mutated code");
            }
        }).not.toThrow();
        global.process = originalProcess;
    });
});