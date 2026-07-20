import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise', () => {
    it('should reject promise when error is thrown in progress callback', () => {
        const promise = Q.resolve();
        const progressCallback = jest.fn(() => { throw new Error('Test error'); });
        const rejectCallback = jest.fn();
        promise.then(void 0, void 0, progressCallback).then(void 0, rejectCallback);
        expect(progressCallback).toHaveBeenCalledTimes(1);
        expect(rejectCallback).toHaveBeenCalledTimes(1);
    });
});