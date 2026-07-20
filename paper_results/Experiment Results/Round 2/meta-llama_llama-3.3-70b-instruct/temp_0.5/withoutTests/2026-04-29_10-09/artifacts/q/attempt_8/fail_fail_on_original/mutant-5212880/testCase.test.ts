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
    });

    it('should throw an error when done method is not called correctly', () => {
        const object = Q.resolve('test');
        const fulfilled = jest.fn();
        const rejected = jest.fn();
        const progress = jest.fn();

        // Mock the done method to not call the then method
        const originalDone = Q.done;
        Q.done = function (obj: any, ful: any, rej: any, prog: any) {
            // Do nothing
        };

        expect(() => Q.done(object, fulfilled, rejected, progress)).toThrowError();

        Q.done = originalDone;
    });
});