import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should call the error handler when the progress callback throws an error in the original code but not in the mutated code', () => {
        const promise = Q.resolve();
        const error = new Error('Test error');
        const progressCallback = () => { throw error; };
        const errorHandler = jest.fn();
        Q.onerror = errorHandler;
        promise.progress(progressCallback);
        expect(errorHandler).toHaveBeenCalledTimes(1);
        Q.onerror = null;
    });
});