import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call the done method correctly', () => {
        const object = Q.resolve('test');
        const fulfilled = jest.fn();
        const rejected = jest.fn();
        const progress = jest.fn();

        Q.done(object, fulfilled, rejected, progress);

        expect(fulfilled).toHaveBeenCalledTimes(1);
        expect(rejected).toHaveBeenCalledTimes(0);
        expect(progress).toHaveBeenCalledTimes(0);

        // Check if Q.done calls the then method on the promise
        const thenSpy = jest.spyOn(object, 'then');
        Q.done(object, fulfilled, rejected, progress);
        expect(thenSpy).toHaveBeenCalledTimes(1);
    });
});