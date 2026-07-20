import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call the when method with the provided arguments', () => {
        const whenSpy = jest.fn();
        const originalWhen = Q.when;
        Q.when = whenSpy;
        Q.when(1, () => {}, () => {}, () => {});
        expect(whenSpy).toHaveBeenCalledTimes(1);
        expect(whenSpy).toHaveBeenCalledWith(1, expect.any(Function), expect.any(Function), expect.any(Function));
        Q.when = originalWhen;
    });
});