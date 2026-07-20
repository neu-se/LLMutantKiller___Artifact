const q = require('./q');

describe('q', () => {
    it('should call the fulfilled callback when the promise is resolved', () => {
        const whenSpy = jest.spyOn(q, 'when');
        const fulfilledSpy = jest.fn();
        const rejectedSpy = jest.fn();
        const progressedSpy = jest.fn();
        
        q.when(1, fulfilledSpy, rejectedSpy, progressedSpy);
        
        expect(whenSpy).toHaveBeenCalledTimes(1);
        expect(whenSpy).toHaveBeenCalledWith(1, fulfilledSpy, rejectedSpy, progressedSpy);
    });
});