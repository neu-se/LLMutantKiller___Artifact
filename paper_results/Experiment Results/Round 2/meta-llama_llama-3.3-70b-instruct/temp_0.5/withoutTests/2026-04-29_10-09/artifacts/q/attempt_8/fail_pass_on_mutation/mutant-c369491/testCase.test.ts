describe('Q', () => {
    it('should throw an error when then method is called with an empty string as the operation', () => {
        const Q = {
            then: (onFulfilled: any, onRejected: any, onProgress: any) => {
                if (onProgress) {
                    throw new Error('then method should not be called with onProgress');
                }
            }
        };
        expect(() => {
            Q.then(void 0, void 0, () => {});
        }).toThrowError('then method should not be called with onProgress');
    });
});