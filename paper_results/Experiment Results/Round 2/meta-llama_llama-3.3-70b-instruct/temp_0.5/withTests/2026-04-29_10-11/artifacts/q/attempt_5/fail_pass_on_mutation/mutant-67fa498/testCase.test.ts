describe("Q.nextTick", () => {
    it("should execute tasks in the order they were added", (done) => {
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
        nextTick(() => {
            order.push('third');
            expect(order).toEqual(['first', 'second', 'third']);
            done();
        });
    });
});