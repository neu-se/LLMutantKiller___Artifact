import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should have module.exports when using CommonJS', () => {
        // @ts-ignore
        const originalModule = global.module;
        // @ts-ignore
        global.module = { exports: {} };
        expect(() => {
            // @ts-ignore
            Q();
        }).not.toThrowError();
        // @ts-ignore
        global.module = originalModule;
    });
});