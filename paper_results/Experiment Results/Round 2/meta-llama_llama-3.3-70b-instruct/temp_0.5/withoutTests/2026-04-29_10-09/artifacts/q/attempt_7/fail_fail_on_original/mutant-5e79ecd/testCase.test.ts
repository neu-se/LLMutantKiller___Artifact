import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle promise chains correctly', () => {
        const promise = Q.resolve('test');
        const fulfilled = jest.fn();
        const rejected = jest.fn();
        const progress = jest.fn();

        promise.done(fulfilled, rejected, progress);

        expect(fulfilled).toHaveBeenCalledTimes(1);
        expect(rejected).toHaveBeenCalledTimes(0);
        expect(progress).toHaveBeenCalledTimes(0);

        const promise2 = Q.resolve('test2');
        promise2.done(fulfilled, rejected, progress);

        expect(fulfilled).toHaveBeenCalledTimes(2);

        // Test the mutation by checking if the 'done' method is called with the correct promise
        const promise3 = Q.resolve('test3');
        expect(() => {
            promise3.done(null, null, null);
        }).toThrowError('Q can\'t apply finally callback');
    });
});