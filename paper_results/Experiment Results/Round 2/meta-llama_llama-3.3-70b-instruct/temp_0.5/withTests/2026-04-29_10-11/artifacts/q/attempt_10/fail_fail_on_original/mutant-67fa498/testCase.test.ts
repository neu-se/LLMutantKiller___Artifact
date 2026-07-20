import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick", () => {
    it("should execute tasks in the order they were added and laterQueue should be processed", (done) => {
        let order: string[] = [];
        Q.nextTick(() => {
            order.push('first');
        });
        Q.nextTick(() => {
            order.push('second');
        });
        Q.nextTick.runAfter(() => {
            order.push('third');
        });
        setTimeout(() => {
            expect(order).toEqual(['first', 'second', 'third']);
            done();
        }, 10);
    });
});