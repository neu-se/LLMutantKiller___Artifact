import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call onerror when an error occurs', () => {
        const error = new Error('Test error');
        const onerrorSpy = jest.fn();
        Q.onerror = onerrorSpy;
        Q.done(Q.reject(error));
        expect(onerrorSpy).toHaveBeenCalledTimes(1);
        expect(onerrorSpy).toHaveBeenCalledWith(error);
    });
});