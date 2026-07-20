import { Q } from "../../../q";

describe('Q promise library', () => {
    it('should call the progress callback when using then', () => {
        const progressSpy = jest.fn();
        const promise = Q.promise((resolve, reject, notify) => {
            notify('progress');
            resolve('result');
        });
        promise.then((value) => value, (error) => error, progressSpy);
        expect(progressSpy).toHaveBeenCalledTimes(1);
        expect(progressSpy).toHaveBeenCalledWith('progress');
    });
});