import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise', () => {
    it('should call reject callback when error is thrown in progress callback', () => {
        const promise = Q.resolve();
        const progressCallback = () => { throw new Error('Test error'); };
        const rejectCallback = jest.fn();
        promise.then(void 0, rejectCallback, progressCallback);
        expect(rejectCallback).toHaveBeenCalledTimes(1);
    });
});