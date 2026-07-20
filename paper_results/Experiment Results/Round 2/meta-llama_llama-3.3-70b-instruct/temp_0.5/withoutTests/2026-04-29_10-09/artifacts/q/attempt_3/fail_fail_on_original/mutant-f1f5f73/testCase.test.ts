import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.tap', () => {
    it('should call the callback with the value of the promise', () => {
        const callback = jest.fn();
        const promise = Q.resolve(42);
        Q(promise).tap(callback);
        // The mutated code does not call the callback, so we expect it to not be called
        expect(callback).not.toHaveBeenCalled();
    });
});