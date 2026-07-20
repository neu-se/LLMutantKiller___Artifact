import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle domain binding correctly', () => {
        const promise = Q.resolve();
        const onUnhandledError = jest.fn();
        promise.done(() => {}, onUnhandledError);
        expect(onUnhandledError).not.toThrow();
        try {
            throw new Error("Test error");
        } catch (error) {
            expect(onUnhandledError).toBeCalledWith(error);
        }
    });
});