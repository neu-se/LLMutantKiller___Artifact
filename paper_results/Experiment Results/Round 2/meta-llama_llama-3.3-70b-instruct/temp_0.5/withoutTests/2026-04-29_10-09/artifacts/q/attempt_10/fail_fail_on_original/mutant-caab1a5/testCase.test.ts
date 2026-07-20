const q = require('../q');

describe('q', () => {
    it('should call the fulfilled callback when the promise is resolved', (done) => {
        const whenSpy = jest.spyOn(q, 'when');
        const fulfilledSpy = jest.fn();
        const rejectedSpy = jest.fn();
        const progressedSpy = jest.fn();
        
        q.when(1, fulfilledSpy, rejectedSpy, progressedSpy);
        
        setTimeout(() => {
            expect(whenSpy).toHaveBeenCalledTimes(1);
            expect(whenSpy).toHaveBeenCalledWith(1, fulfilledSpy, rejectedSpy, progressedSpy);
            expect(fulfilledSpy).toHaveBeenCalledTimes(1);
            expect(fulfilledSpy).toHaveBeenCalledWith(1);
            expect(rejectedSpy).not.toHaveBeenCalled();
            expect(progressedSpy).not.toHaveBeenCalled();
            done();
        }, 0);
    });
});