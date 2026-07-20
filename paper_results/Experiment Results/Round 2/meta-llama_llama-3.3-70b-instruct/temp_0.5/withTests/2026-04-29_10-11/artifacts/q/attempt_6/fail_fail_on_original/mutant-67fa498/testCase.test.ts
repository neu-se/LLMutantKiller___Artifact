describe("Q.nextTick", () => {
    it("should execute tasks in the order they were added and laterQueue should be processed", (done) => {
        let order: string[] = [];
        const nextTick = (task: () => void) => {
            task();
        };
        nextTick(() => {
            order.push('first');
        });
        nextTick(() => {
            order.push('second');
        });
        nextTick.runAfter(() => {
            order.push('third');
        });
        nextTick(() => {
            expect(order).toEqual(['first', 'second', 'third']);
            done();
        });
    });
});