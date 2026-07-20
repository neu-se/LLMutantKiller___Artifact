import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should pass on the original code and fail on the mutated code", () => {
        const originalProcess = global.process;
        global.process = { domain: {} };
        const promise = Q.resolve();
        expect(() => {
            promise.done();
        }).not.toThrow();
        global.process = originalProcess;
    });

    it("should fail on the mutated code", () => {
        const originalProcess = global.process;
        global.process = "";
        const promise = Q.resolve();
        expect(() => {
            promise.done();
        }).toThrow();
        global.process = originalProcess;
    });
});