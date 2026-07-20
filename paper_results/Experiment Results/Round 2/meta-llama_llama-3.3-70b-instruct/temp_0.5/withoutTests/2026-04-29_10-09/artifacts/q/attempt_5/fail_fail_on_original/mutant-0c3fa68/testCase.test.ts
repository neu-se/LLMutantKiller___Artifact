import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when progress function does not call the callback', () => {
        const progressed = jest.fn();
        const promise = q.defer();
        q.progress(promise.promise, progressed);
        promise.notify('progress');
        expect(progressed).toHaveBeenCalledTimes(1);
        // If the progress function does not call the callback, this test will fail.
    });
});