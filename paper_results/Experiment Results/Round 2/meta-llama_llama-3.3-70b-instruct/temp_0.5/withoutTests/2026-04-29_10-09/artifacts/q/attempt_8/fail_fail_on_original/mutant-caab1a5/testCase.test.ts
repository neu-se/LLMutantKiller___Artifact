describe('q', () => {
    it('should call the fulfilled callback when the promise is resolved', () => {
        const q = require('../../q');
        const when = q.when;
        const fulfilledSpy = jest.fn();
        const rejectedSpy = jest.fn();
        const progressedSpy = jest.fn();
        
        when(1, fulfilledSpy, rejectedSpy, progressedSpy);
        
        expect(fulfilledSpy).toHaveBeenCalledTimes(1);
        expect(fulfilledSpy).toHaveBeenCalledWith(1);
        expect(rejectedSpy).not.toHaveBeenCalled();
        expect(progressedSpy).not.toHaveBeenCalled();
    });
});