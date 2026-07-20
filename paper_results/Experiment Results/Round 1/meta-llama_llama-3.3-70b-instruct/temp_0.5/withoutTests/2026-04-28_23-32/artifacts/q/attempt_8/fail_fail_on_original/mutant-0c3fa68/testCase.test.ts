import { Q } from "../../../q";

describe('Q', () => {
    it('should call the progress callback when a promise is pending', () => {
        const progressSpy = jest.fn();
        const promise = Q.defer().promise;
        Q.progress(promise, progressSpy);
        promise.notify('progress');
        expect(progressSpy).toHaveBeenCalledTimes(1);
        expect(progressSpy).toHaveBeenCalledWith('progress');
    });
});