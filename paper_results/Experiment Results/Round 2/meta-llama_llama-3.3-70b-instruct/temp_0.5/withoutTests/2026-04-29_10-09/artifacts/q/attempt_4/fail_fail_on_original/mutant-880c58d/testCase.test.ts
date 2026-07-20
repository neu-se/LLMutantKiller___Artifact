import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not have longStackSupport enabled by default', () => {
        delete process.env.Q_DEBUG;
        const originalCodeQ = Q;
        expect(originalCodeQ.longStackSupport).toBe(false);
    });
});