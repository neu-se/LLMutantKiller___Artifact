import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should handle process.domain correctly", () => {
        // Create a mock process object with domain property
        const process = {
            domain: {
                bind: jest.fn(),
            },
        };

        // Call the done method with a promise and a callback
        const promise = Q.resolve();
        const callback = jest.fn();
        promise.done(callback, undefined, undefined, undefined);

        // Check if process.domain.bind is called with the correct callback
        expect(process.domain.bind).toHaveBeenCalledTimes(1);
        expect(process.domain.bind).toHaveBeenCalledWith(expect.any(Function));
    });
});