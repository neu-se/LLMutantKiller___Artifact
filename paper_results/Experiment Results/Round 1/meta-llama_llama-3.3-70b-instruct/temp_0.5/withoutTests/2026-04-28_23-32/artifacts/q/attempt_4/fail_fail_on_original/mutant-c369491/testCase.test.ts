import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should call the "then" method with the correct operation', () => {
        const promise = Q('test');
        const thenSpy = jest.fn();
        const catchSpy = jest.fn();
        const progressSpy = jest.fn();

        promise.then(thenSpy, catchSpy, progressSpy);

        expect(thenSpy).toHaveBeenCalledTimes(1);
        expect(thenSpy).toHaveBeenCalledWith('test');
        expect(catchSpy).toHaveBeenCalledTimes(0);
        expect(progressSpy).toHaveBeenCalledTimes(0);

        // Check if the promiseDispatch method is called with the correct operation
        const promiseDispatchSpy = jest.spyOn(promise, 'promiseDispatch');
        promise.then(thenSpy, catchSpy, progressSpy);
        expect(promiseDispatchSpy).toHaveBeenCalledTimes(1);
        expect(promiseDispatchSpy.mock.calls[0][1]).toBe('when');
    });
});