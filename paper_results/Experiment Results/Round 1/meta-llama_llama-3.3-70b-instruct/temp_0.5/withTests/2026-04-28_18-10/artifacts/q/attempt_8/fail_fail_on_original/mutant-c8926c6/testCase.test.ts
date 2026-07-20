import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should detect the mutation in the nextTick function", () => {
        const nextTick = Q.nextTick;
        expect(nextTick).toBeInstanceOf(Function);
        const spy = jest.fn();
        nextTick(spy);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(() => {
            Q.nextTick(function () {
                throw new Error('Test Error');
            });
        }).toThrowError('Test Error');
    });
});