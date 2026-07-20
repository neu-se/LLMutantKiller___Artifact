import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle domain exit correctly', async () => {
        const domain = { enter: jest.fn(), exit: jest.fn() };
        const error = new Error();
        try {
            q.nextTick(function () {
                throw error;
            });
        } catch (e) {
            if (domain.exit.mock.calls.length !== 0) {
                throw new Error('Domain exit was called');
            }
        }
    });
});