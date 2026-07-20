import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not throw an error when nextTick is called with a function', () => {
        expect(() => Q.nextTick(() => {})).not.toThrowError();
    });
});