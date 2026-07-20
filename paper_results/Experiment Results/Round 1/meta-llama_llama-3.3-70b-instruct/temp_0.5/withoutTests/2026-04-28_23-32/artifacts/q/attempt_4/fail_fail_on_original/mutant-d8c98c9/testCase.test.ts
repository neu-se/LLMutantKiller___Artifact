import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle domain exit correctly', async () => {
        const domain = { enter: jest.fn(), exit: jest.fn() };
        const originalNextTick = q.nextTick;
        q.nextTick = function (task) {
            task();
        };
        try {
            q.nextTick(function () {
                throw new Error();
            });
            await new Promise(resolve => {
                q.nextTick(resolve);
            });
        } catch (e) {
            if (domain.exit.mock.calls.length !== 1) {
                throw new Error('Domain exit was not called correctly');
            }
        } finally {
            q.nextTick = originalNextTick;
        }
    });
});