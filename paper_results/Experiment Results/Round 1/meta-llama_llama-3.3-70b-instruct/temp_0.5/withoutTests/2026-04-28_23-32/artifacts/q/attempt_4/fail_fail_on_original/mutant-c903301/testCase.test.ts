import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise', () => {
    it('should not call reject callback when no error is thrown in progress callback and error is not thrown in then block in mutated code', () => {
        const promise = Q.resolve();
        const progressCallback = () => {};
        const rejectCallback = jest.fn();
        promise.then(void 0, rejectCallback, progressCallback);
        expect(rejectCallback).not.toHaveBeenCalled();
    });
});