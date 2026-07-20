import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle domain binding correctly', () => {
        const originalProcessDomain = global.process && global.process.domain;
        if (global.process && global.process.domain) {
            global.process.domain = { bind: jest.fn(), exit: jest.fn(), enter: jest.fn() };
        }

        Q.done(Promise.reject(new Error('Test error')), null, null, null);

        if (global.process && global.process.domain) {
            expect(global.process.domain.bind).toHaveBeenCalledTimes(1);
            global.process.domain = originalProcessDomain;
        }
    });
});