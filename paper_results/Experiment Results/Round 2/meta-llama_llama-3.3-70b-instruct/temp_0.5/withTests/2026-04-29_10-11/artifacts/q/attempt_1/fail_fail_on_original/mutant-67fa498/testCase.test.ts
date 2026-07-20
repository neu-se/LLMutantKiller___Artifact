import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick", () => {
    it("should execute a task in a future turn of the event loop", (done) => {
        let executed = false;
        Q.nextTick(() => {
            executed = true;
        });
        expect(executed).toBe(false);
        setTimeout(() => {
            expect(executed).toBe(true);
            done();
        }, 10);
    });

    it("should not execute a task immediately", (done) => {
        let executed = false;
        Q.nextTick(() => {
            executed = true;
        });
        expect(executed).toBe(false);
        done();
    });

    it("should execute tasks in the order they were added", (done) => {
        let order = [];
        Q.nextTick(() => {
            order.push(1);
        });
        Q.nextTick(() => {
            order.push(2);
        });
        Q.nextTick(() => {
            order.push(3);
        });
        setTimeout(() => {
            expect(order).toEqual([1, 2, 3]);
            done();
        }, 10);
    });

    it("should execute tasks even if the laterQueue is empty", (done) => {
        let executed = false;
        Q.nextTick(() => {
            executed = true;
        });
        Q.nextTick.runAfter(() => {
            // This should not prevent the previous task from executing
        });
        setTimeout(() => {
            expect(executed).toBe(true);
            done();
        }, 10);
    });
});