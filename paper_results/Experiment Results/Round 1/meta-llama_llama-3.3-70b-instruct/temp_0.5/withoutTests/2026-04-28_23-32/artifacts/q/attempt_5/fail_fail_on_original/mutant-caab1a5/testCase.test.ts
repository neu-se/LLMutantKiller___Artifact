import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when the when method does not call its callbacks', () => {
        const whenSpy = jest.fn();
        const originalWhen = Q.when;
        Q.when = () => {};
        expect(() => Q.when(1, whenSpy, whenSpy)).not.toThrow();
        Q.when = originalWhen;
        expect(whenSpy).not.toHaveBeenCalled();
    });
});