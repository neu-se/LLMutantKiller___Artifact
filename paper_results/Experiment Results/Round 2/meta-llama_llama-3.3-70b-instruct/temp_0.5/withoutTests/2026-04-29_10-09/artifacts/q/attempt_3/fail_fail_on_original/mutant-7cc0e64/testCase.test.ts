import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle domain binding correctly", () => {
        const process = {
            domain: {
                bind: jest.fn()
            }
        };

        const onUnhandledError = jest.fn();
        Q.done(Q.reject(new Error("Test error")), null, null, null, onUnhandledError);
        expect(process.domain.bind).toHaveBeenCalledTimes(1);
    });
});