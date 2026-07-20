import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should throw an error when progress callback throws an error', () => {
        const promise = Q.resolve();
        const error = new Error('Test error');
        const progressCallback = () => { throw error; };
        const test = () => promise.progress(progressCallback);
        expect(test).toThrowError(error);
    });
});