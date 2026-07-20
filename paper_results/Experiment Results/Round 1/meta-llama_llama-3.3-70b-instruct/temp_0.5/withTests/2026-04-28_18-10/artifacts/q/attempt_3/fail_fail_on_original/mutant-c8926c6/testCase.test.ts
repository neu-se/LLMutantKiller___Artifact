import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should detect the mutation in the nextTick function", () => {
        const isNode = typeof process !== 'undefined' && process.toString === '[object process]';
        if (isNode) {
            const nextTick = Q.nextTick;
            const spy = jest.fn();
            nextTick(spy);
            expect(spy).toHaveBeenCalledTimes(1);
        } else {
            expect(() => Q.nextTick(() => {})).not.toThrow();
        }
    });
});