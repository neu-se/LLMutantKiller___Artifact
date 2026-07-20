import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick", () => {
    it("should execute tasks in the order they were added", (done) => {
        let count = 0;
        let order: string[] = [];
        Q.nextTick(() => {
            order.push('first');
            Q.nextTick(() => {
                order.push('second');
                Q.nextTick(() => {
                    order.push('third');
                    expect(order).toEqual(['first', 'second', 'third']);
                    done();
                });
            });
        });
    });
});