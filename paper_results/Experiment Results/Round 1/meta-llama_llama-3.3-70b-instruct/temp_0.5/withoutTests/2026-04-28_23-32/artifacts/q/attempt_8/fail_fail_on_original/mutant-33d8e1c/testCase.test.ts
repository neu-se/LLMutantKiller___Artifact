import { Q } from "../../../q.js";

describe('Q promise library', () => {
    it('should call the progress callback when using then', () => {
        const progressSpy = jest.fn();
        const promise = Q((resolve, reject, notify) => {
            notify('progress');
            resolve('result');
        });
        promise.then((value) => value, (error) => { throw error; }, progressSpy);
        expect(progressSpy).toHaveBeenCalledTimes(1);
        expect(progressSpy).toHaveBeenCalledWith('progress');
    });
});