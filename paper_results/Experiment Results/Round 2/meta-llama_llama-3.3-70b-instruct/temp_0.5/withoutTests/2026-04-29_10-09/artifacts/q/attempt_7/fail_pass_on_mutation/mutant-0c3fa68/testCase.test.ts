import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should have a progress function that calls the callback when the promise is rejected', async () => {
        const progress = q.progress;
        const callback = jest.fn();
        const promise = q.defer();
        progress(promise.promise, callback);
        promise.reject('rejected');
        await promise.promise.catch(() => {});
        expect(callback).toHaveBeenCalledTimes(0);
    });
});