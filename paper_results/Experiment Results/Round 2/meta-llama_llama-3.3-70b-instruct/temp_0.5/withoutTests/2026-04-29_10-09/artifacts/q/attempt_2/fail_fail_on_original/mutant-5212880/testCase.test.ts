import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call the done method correctly', () => {
        const object = Q.resolve('test');
        const fulfilled = jest.fn();
        const rejected = jest.fn();
        const progress = jest.fn();

        const doneSpy = jest.spyOn(Q, 'done');

        Q.done(object, fulfilled, rejected, progress);

        expect(doneSpy).toHaveBeenCalledTimes(1);
        expect(doneSpy).toHaveBeenCalledWith(object, fulfilled, rejected, progress);
    });
});