import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle domain binding correctly', () => {
        const originalProcessDomain = global.process.domain;
        global.process.domain = { bind: jest.fn() };
        const onUnhandledError = jest.fn();
        const promise = Q.resolve();
        promise.done(() => {}, onUnhandledError);
        expect(onUnhandledError).toBeBound();
        global.process.domain = originalProcessDomain;
    });
});