import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle domain binding correctly', () => {
        const process = {
            domain: {
                bind: jest.fn(),
            },
        };
        const onUnhandledError = jest.fn();
        const promise = Q();
        promise.done();
        Q.onerror = onUnhandledError;
        expect(process.domain.bind).toHaveBeenCalledTimes(1);
        expect(process.domain.bind).toHaveBeenCalledWith(onUnhandledError);
    });
});