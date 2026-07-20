import { Q } from './q';

describe('Q', () => {
    it('should call the fulfilled callback when the promise is resolved', (done) => {
        const fulfilledSpy = jest.fn();
        const rejectedSpy = jest.fn();
        const progressedSpy = jest.fn();
        
        Q.when(1, fulfilledSpy, rejectedSpy, progressedSpy);
        
        setTimeout(() => {
            expect(fulfilledSpy).toHaveBeenCalledTimes(1);
            expect(fulfilledSpy).toHaveBeenCalledWith(1);
            expect(rejectedSpy).not.toHaveBeenCalled();
            expect(progressedSpy).not.toHaveBeenCalled();
            done();
        }, 0);
    });
});