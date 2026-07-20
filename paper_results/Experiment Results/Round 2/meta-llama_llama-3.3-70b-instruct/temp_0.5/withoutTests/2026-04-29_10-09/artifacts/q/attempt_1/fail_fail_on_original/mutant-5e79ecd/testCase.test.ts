import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle promise chains correctly', () => {
        const promise = Q.resolve('test');
        const fulfilled = jest.fn();
        const rejected = jest.fn();
        const progress = jest.fn();

        promise.then(fulfilled, rejected, progress);
        promise.then(fulfilled, rejected, progress);

        expect(fulfilled).toHaveBeenCalledTimes(2);
        expect(rejected).toHaveBeenCalledTimes(0);
        expect(progress).toHaveBeenCalledTimes(0);
    });
});