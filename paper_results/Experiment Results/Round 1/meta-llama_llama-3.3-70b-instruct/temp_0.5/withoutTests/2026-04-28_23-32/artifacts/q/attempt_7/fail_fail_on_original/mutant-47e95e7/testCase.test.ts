describe('Q Promise', () => {
    it('should return a promise that is fulfilled when the value is an object', (done) => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        const promise = Q({ a: 5 });
        promise.then((value) => {
            expect(value).toEqual({ a: 5 });
            done();
        });
    });
});