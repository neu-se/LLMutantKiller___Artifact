import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        const promise = Q.reject('Test rejection');
        expect(typeof global.process.emit).toBe('function');
    });
});