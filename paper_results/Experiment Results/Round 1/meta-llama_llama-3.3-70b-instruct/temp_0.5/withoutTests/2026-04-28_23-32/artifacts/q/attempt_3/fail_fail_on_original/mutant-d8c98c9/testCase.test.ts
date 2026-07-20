import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle domain exit correctly', async () => {
        const domain = { enter: jest.fn(), exit: jest.fn() };
        process.domain = domain;
        try {
            Q.nextTick(function () {
                throw new Error();
            });
            await new Promise(resolve => {
                Q.nextTick(resolve);
            });
        } catch (e) {
            expect(domain.exit).toHaveBeenCalledTimes(1);
        }
    });
});