import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should not call Q.onerror when progress callback does not throw an error', () => {
        const promise = Q.resolve();
        const progressCallback = () => {};
        const errorHandler = jest.fn();
        Q.onerror = errorHandler;
        promise.progress(progressCallback);
        expect(errorHandler).not.toHaveBeenCalled();
    });
});