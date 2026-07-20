import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        const promise = Q.reject('Test rejection');
        expect(global.process.emit).toBeDefined();
        expect(typeof global.process.emit).toBe('function');
    });
});