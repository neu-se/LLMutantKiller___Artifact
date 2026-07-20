import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise', () => {
    it('should reject promise when error is thrown in progress callback in original code but not in mutated code', () => {
        const promise = Q.resolve();
        const progressCallback = () => { throw new Error('Test error'); };
        const rejectCallback = jest.fn();
        promise.then(void 0, rejectCallback, progressCallback);
        expect(rejectCallback).toHaveBeenCalledTimes(1);
    });
});