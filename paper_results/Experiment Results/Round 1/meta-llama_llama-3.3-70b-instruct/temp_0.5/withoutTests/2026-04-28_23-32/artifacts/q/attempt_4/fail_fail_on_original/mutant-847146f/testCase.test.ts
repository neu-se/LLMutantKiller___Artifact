import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call catch method with a promise and a rejection handler', () => {
        const promise = Q.resolve('test');
        const rejectionHandler = jest.fn();
        promise.catch(rejectionHandler);
        expect(rejectionHandler).not.toHaveBeenCalled();
    });
});