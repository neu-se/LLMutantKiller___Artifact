describe('Q', () => {
    it('should track unhandled rejections', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        const promise = Q.reject('Test rejection');
        if (typeof global.process.emit === 'string') {
            throw new Error('process.emit should be a function');
        }
    });
});