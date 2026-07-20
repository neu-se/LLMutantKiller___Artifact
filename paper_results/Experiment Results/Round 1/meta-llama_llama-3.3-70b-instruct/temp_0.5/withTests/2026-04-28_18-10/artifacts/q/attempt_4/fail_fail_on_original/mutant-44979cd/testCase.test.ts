describe('q', () => {
    it('should have module.exports when using CommonJS', () => {
        // @ts-ignore
        const originalModule = global.module;
        // @ts-ignore
        global.module = { exports: {} };
        // @ts-ignore
        const Q = require('../../../../../../../../../subject_repositories/q/q.js');
        expect(Q).toBeDefined();
        // @ts-ignore
        global.module = originalModule;
    });
});