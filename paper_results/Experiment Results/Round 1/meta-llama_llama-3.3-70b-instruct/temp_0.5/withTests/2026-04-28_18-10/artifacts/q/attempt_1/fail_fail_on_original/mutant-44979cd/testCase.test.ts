import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should throw an error when using CommonJS without module.exports', () => {
        // @ts-ignore
        const originalModule = global.module;
        // @ts-ignore
        global.module = undefined;
        expect(() => {
            // @ts-ignore
            Q();
        }).toThrowError('This environment was not anticipated by Q. Please file a bug.');
        // @ts-ignore
        global.module = originalModule;
    });
});