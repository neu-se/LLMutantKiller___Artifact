import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle domain binding correctly', () => {
        const originalProcessDomain = global.process.domain;
        global.process.domain = { bind: jest.fn(), exit: jest.fn(), enter: jest.fn() };
        const promise = Q.resolve();
        const onUnhandledError = jest.fn();
        promise.done(() => {}, onUnhandledError);
        expect(global.process.domain.bind).toHaveBeenCalledTimes(1);
        global.process.domain = originalProcessDomain;
    });
});