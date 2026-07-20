import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should call the "then" method with the correct arguments', () => {
        const promise = Q.resolve('test');
        const thenSpy = jest.fn();
        const catchSpy = jest.fn();
        const progressSpy = jest.fn();

        promise.then(thenSpy, catchSpy, progressSpy);

        expect(thenSpy).toHaveBeenCalledTimes(1);
        expect(thenSpy).toHaveBeenCalledWith('test');
        expect(catchSpy).toHaveBeenCalledTimes(0);
        expect(progressSpy).toHaveBeenCalledTimes(0);
    });
});