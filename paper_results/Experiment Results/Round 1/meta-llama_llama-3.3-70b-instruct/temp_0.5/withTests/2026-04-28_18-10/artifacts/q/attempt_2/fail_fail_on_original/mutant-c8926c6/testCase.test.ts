import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should detect the mutation in the nextTick function", () => {
        const nextTick = Q.nextTick;
        const originalProcess = global.process;
        global.process = undefined;
        const spy = jest.fn();
        nextTick(spy);
        expect(spy).toHaveBeenCalledTimes(1);
        global.process = originalProcess;
        const nextTick2 = Q.nextTick;
        const spy2 = jest.fn();
        nextTick2(spy2);
        expect(spy2).toHaveBeenCalledTimes(1);
        if (typeof process !== 'undefined' && process.toString() === '[object process]') {
            expect(nextTick).not.toEqual(nextTick2);
        }
    });
});