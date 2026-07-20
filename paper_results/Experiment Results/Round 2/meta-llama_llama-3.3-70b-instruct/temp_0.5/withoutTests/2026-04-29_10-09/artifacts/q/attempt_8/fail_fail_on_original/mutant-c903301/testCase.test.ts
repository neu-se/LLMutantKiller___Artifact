import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should throw an error when progress callback throws an error in the original code but not in the mutated code', () => {
        const promise = Q.resolve();
        const error = new Error('Test error');
        const progressCallback = () => { throw error; };
        const errorHandler = jest.fn();
        Q.onerror = errorHandler;
        expect(() => promise.progress(progressCallback)).toThrowError(error);
    });
});