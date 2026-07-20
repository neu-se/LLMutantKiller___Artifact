import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should handle process.domain correctly", () => {
        const originalProcess = global.process;
        global.process = { domain: {} };

        const promise = Q.resolve();
        const callback = jest.fn();
        const error = new Error();

        // The original code will not throw an error because process.domain is an object
        // The mutated code will throw an error because it checks for typeof process === "object" || process && process.domain
        expect(() => {
            promise.done(callback, undefined, undefined, undefined);
        }).not.toThrowError();

        global.process = originalProcess;
    });
});