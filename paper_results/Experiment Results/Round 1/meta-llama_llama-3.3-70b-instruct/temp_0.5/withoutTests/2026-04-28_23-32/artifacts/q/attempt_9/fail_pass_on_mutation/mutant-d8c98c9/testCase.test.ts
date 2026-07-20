import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle domain exit correctly', async () => {
        const domain = { enter: jest.fn(), exit: jest.fn() };
        q.nextTick(function () {
            domain.enter();
            domain.exit();
        });
        await new Promise(resolve => {
            q.nextTick(resolve);
        });
        expect(domain.exit).toHaveBeenCalledTimes(1);
    });
});