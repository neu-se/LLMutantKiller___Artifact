describe('q', () => {
    it('should correctly handle CommonJS module exports', () => {
        const Q = require('../../../../../../../../../subject_repositories/q/q.js');
        const deferred = Q.defer();
        expect(deferred).toBeDefined();
        deferred.resolve();
    });
});