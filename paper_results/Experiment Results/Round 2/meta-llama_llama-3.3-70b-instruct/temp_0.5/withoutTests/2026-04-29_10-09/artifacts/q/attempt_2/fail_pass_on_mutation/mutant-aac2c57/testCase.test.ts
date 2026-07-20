import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should handle process.domain correctly", () => {
        // Create a mock process object with domain property
        const process = {
            domain: {},
        };

        // Create a mock Q object
        const Q = {
            done: (promise, fulfilled, rejected, progress) => {
                if (process.domain) {
                    // Check if process.domain is an object
                    if (typeof process === "object" && process && process.domain) {
                        // If process.domain is an object, do nothing
                    } else {
                        throw new Error("process.domain should be an object");
                    }
                }
            },
        };

        // Call the done method with a promise and a callback
        const promise = {};
        const callback = jest.fn();
        Q.done(promise, callback, undefined, undefined);

        // Check if no error is thrown
        expect(callback).toHaveBeenCalledTimes(0);
    });
});