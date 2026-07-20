import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call the then method when the promise is resolved', () => {
        const thenSpy = jest.fn();
        const promise = Q(1);
        promise.then(thenSpy);
        expect(thenSpy).toHaveBeenCalledTimes(1);
        expect(thenSpy).toHaveBeenCalledWith(1);
    });
});