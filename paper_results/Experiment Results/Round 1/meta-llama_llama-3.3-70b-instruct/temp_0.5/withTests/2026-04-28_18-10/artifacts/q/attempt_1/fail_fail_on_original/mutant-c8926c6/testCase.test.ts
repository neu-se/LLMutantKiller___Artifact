import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should detect the mutation in the nextTick function", () => {
        // The mutation is in the nextTick function, specifically in the line where it checks if the environment is Node.js.
        // We can test this by checking if the nextTick function behaves differently in a Node.js environment versus a non-Node.js environment.
        // In a Node.js environment, nextTick should use process.nextTick, while in a non-Node.js environment, it should use a different implementation.
        const isNode = typeof process !== 'undefined' && process.toString() === '[object process]';
        if (isNode) {
            // In a Node.js environment, nextTick should use process.nextTick.
            const originalNextTick = Q.nextTick;
            const spy = jest.fn();
            Q.nextTick(spy);
            expect(spy).toHaveBeenCalledTimes(1);
            // We can't directly test if process.nextTick is called, but we can test if the nextTick function behaves as expected.
            // If the mutation is present, the nextTick function will not work correctly in a non-Node.js environment.
        } else {
            // In a non-Node.js environment, nextTick should not use process.nextTick.
            const originalNextTick = Q.nextTick;
            const spy = jest.fn();
            Q.nextTick(spy);
            expect(spy).toHaveBeenCalledTimes(1);
            // If the mutation is present, the nextTick function will not work correctly in a non-Node.js environment.
            // We can test this by checking if the nextTick function throws an error in a non-Node.js environment.
            expect(() => Q.nextTick(() => {})).not.toThrow();
        }
    });
});