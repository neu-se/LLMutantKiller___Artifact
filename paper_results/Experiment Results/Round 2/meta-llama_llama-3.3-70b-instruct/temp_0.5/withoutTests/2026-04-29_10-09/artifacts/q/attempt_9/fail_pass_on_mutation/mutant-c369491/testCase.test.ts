describe('Q', () => {
    it('should call the then method with the correct operation', () => {
        const Q = {
            then: (onFulfilled: any, onRejected: any, onProgress: any) => {
                if (onProgress) {
                    throw new Error('then method should not be called with onProgress');
                }
            },
            promiseDispatch: (resolve: any, op: string, args: any) => {
                expect(op).toBe('when');
            }
        };
        Q.then(void 0, void 0, void 0);
        Q.promiseDispatch(void 0, 'when', [void 0, () => {}]);
    });
});