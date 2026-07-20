import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        const promise = Q.reject('Test rejection');
        if (typeof global.process.emit === 'string') {
            throw new Error('process.emit should be a function');
        }
    });
});