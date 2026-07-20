describe('Q', () => {
    it('should call the when method with the provided arguments', () => {
        const Q = {
            when: (value: any, fulfilled: (value: any) => void, rejected: (reason: any) => void, progressed: (progress: any) => void) => {
                fulfilled(value);
            }
        };
        const fulfilledSpy = jest.fn();
        const rejectedSpy = jest.fn();
        const progressedSpy = jest.fn();
        Q.when(1, fulfilledSpy, rejectedSpy, progressedSpy);
        expect(fulfilledSpy).toHaveBeenCalledTimes(1);
        expect(fulfilledSpy).toHaveBeenCalledWith(1);
    });

    it('should not call the when method with the provided arguments when mutated', () => {
        const Q = {
            when: () => {}
        };
        const fulfilledSpy = jest.fn();
        const rejectedSpy = jest.fn();
        const progressedSpy = jest.fn();
        Q.when(1, fulfilledSpy, rejectedSpy, progressedSpy);
        expect(fulfilledSpy).not.toHaveBeenCalled();
    });
});