import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('q', () => {
    it('should test the behavior of the mutated file', () => {
        const nextTickSpy = jest.spyOn(Q, 'nextTick');
        Q.nextTick.runAfter(() => {});
        expect(nextTickSpy).toHaveBeenCalledTimes(1);
        nextTickSpy.mockRestore();
    });
});