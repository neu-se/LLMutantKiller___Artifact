import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not allow a non-function callback in the finally method', () => {
        const callback = "not a function";
        expect(() => Q().finally(callback)).toThrowError("Q can't apply finally callback");
    });
});