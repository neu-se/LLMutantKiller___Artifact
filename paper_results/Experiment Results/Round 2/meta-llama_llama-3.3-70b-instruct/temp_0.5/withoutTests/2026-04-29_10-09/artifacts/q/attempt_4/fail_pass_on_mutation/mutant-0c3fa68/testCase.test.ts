import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should define the progress function', () => {
        expect(q.progress).toBeDefined();
    });

    it.skip('should call the progressed callback when progress is made', () => {
        const progressed = jest.fn();
        const promise = q.defer();
        q.progress(promise.promise, progressed);
        promise.notify('progress');
        expect(progressed).toHaveBeenCalledTimes(1);
    });
});