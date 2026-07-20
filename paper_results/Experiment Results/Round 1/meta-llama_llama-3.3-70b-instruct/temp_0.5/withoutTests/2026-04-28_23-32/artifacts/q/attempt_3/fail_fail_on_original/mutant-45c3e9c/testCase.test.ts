describe('Q', () => {
    it('should run the next tick when using runAfter', () => {
        let flag = false;
        const originalFlush = Q.nextTick.flush;
        Q.nextTick.flush = () => {
            flag = true;
        };
        Q.nextTick.runAfter(() => {});
        expect(flag).toBe(false);
        Q.nextTick.flush();
        expect(flag).toBe(true);
        Q.nextTick.flush = originalFlush;
    });
});