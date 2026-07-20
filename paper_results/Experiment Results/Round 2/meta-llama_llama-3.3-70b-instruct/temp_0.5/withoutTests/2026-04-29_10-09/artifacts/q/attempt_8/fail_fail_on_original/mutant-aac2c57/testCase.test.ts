import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should handle process.domain correctly", () => {
        const originalProcess = global.process;
        global.process = null;

        const promise = Q.resolve();
        const callback = jest.fn();
        const error = new Error();

        // The original code will throw an error because process is null
        // The mutated code will not throw an error because it checks for typeof process === "object" || process && process.domain
        expect(() => promise.done(callback, (err) => {
            throw err;
        }, undefined, undefined)).toThrowError();

        global.process = originalProcess;
    });
});