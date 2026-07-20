import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call the progressed callback when progress is made', () => {
        const progressed = jest.fn();
        const promise = Q.defer();
        Q.progress(promise.promise, progressed);
        promise.notify('progress');
        expect(progressed).toHaveBeenCalledTimes(1);
        expect(progressed).toHaveBeenCalledWith('progress');
    });
});