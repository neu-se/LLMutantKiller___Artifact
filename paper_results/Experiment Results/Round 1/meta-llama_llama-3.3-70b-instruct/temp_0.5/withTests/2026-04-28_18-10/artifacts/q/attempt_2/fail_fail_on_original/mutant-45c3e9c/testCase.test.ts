import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should test the behavior of the mutated file', () => {
        const task = jest.fn();
        Q.nextTick(task);
        Q.nextTick.runAfter(task);
        expect(task).toHaveBeenCalledTimes(2);
    });
});