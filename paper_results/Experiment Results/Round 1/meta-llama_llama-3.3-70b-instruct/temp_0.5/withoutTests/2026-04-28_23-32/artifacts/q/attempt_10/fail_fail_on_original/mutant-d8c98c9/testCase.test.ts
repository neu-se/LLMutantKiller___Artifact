import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle domain exit correctly', async () => {
        const error = new Error();
        const domain = { enter: jest.fn(), exit: jest.fn() };
        q.nextTick(function () {
            throw error;
        }, domain);
        try {
            await new Promise(resolve => {
                q.nextTick(resolve);
            });
        } catch (e) {
            expect(domain.exit).toHaveBeenCalledTimes(1);
        }
    });
});