import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle domain exit correctly', async () => {
        const error = new Error();
        const domain = { enter: jest.fn(), exit: jest.fn() };
        Q.nextTick(function () {
            throw error;
        }, domain);
        await new Promise(resolve => {
            Q.nextTick(resolve);
        });
        expect(domain.exit).toHaveBeenCalledTimes(1);
    });
});