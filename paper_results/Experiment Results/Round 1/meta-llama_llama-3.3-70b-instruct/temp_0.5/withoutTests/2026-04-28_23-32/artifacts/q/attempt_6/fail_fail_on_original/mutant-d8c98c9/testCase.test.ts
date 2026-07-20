import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle domain exit correctly', async () => {
        const domain = { enter: jest.fn(), exit: jest.fn() };
        const processDomain = { ...process.domain };
        process.domain = domain;
        try {
            q.nextTick(function () {
                throw new Error();
            });
        } catch (e) {
            if (domain.exit.mock.calls.length !== 1) {
                throw new Error('Domain exit was not called');
            }
        } finally {
            process.domain = processDomain;
        }
    });
});