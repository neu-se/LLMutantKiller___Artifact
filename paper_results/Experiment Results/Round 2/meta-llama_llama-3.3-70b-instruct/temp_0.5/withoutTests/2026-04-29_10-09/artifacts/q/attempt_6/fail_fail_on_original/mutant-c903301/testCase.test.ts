import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should call Q.onerror when progress callback throws an error', () => {
        const promise = Q.resolve();
        const error = new Error('Test error');
        const progressCallback = () => { throw error; };
        const errorHandler = jest.fn();
        Q.onerror = errorHandler;
        promise.progress(progressCallback);
        expect(errorHandler).toHaveBeenCalledTimes(1);
    });
});