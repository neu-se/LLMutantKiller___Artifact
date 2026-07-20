describe('Q', () => {
    it('should call the promiseDispatch method with the correct operation', () => {
        const Q = {
            promiseDispatch: (resolve: any, op: string, args: any) => {
                expect(op).toBe('when');
            }
        };
        Q.promiseDispatch(void 0, 'when', [void 0, () => {}]);
    });
});