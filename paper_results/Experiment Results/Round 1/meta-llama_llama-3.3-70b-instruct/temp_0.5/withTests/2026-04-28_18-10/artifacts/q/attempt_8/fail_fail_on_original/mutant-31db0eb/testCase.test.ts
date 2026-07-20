describe('nextTick', () => {
    it('should call the function passed to nextTick', (done) => {
        let called = false;
        const func = () => {
            called = true;
            done();
        };
        // @ts-ignore
        nextTick(func);
        // @ts-ignore
        expect(called).toBeFalsy();
    });
});