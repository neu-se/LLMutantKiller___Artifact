import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle domain exit correctly', async () => {
        const domain = { enter: jest.fn(), exit: jest.fn() };
        const task = jest.fn();
        const nextTick = Q.nextTick;
        Q.nextTick = (cb) => cb();
        try {
            nextTick(task, domain);
            task();
            expect(domain.exit).toHaveBeenCalledTimes(1);
        } finally {
            Q.nextTick = nextTick;
        }
    });
});