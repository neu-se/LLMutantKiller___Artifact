import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should pass when process.domain is truthy in the original code and falsy in the mutated code', () => {
        const originalProcessDomain = (global as any).process.domain;
        (global as any).process.domain = {};
        const promise = Q.resolve();
        const onUnhandledError = jest.fn();
        promise.done(null, null, null);
        (global as any).process.domain = null;
        (global as any).Q = Q;
        const mutatedPromise = Q.resolve();
        const mutatedOnUnhandledError = jest.fn();
        mutatedPromise.done(null, null, null);
        expect(onUnhandledError).toHaveBeenCalledTimes(1);
        expect(mutatedOnUnhandledError).toHaveBeenCalledTimes(0);
        (global as any).process.domain = originalProcessDomain;
    });
});