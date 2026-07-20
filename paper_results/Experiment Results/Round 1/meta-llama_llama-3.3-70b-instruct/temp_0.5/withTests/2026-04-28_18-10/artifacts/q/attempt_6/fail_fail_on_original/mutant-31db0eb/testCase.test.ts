import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q function', () => {
    it('should call the function passed to nextTick', () => {
        const func = jest.fn();
        Q.nextTick(func);
        expect(func).toHaveBeenCalledTimes(1);
    });
});