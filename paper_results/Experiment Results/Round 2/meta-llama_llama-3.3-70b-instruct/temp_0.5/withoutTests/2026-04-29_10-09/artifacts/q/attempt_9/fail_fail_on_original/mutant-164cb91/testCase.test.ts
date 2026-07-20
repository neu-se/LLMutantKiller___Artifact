describe('Q', () => {
    it('should track unhandled rejections', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        const promise = Q.reject('Test rejection');
        expect(typeof global.process.emit).toBe('function');
    });
});