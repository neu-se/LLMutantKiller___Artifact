import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call the when method with the provided arguments', () => {
        const fulfilledSpy = jest.fn();
        const rejectedSpy = jest.fn();
        const progressedSpy = jest.fn();
        Q.when(1, fulfilledSpy, rejectedSpy, progressedSpy);
        expect(fulfilledSpy).toHaveBeenCalledTimes(1);
        expect(fulfilledSpy).toHaveBeenCalledWith(1);
        expect(rejectedSpy).not.toHaveBeenCalled();
        expect(progressedSpy).not.toHaveBeenCalled();
    });
});