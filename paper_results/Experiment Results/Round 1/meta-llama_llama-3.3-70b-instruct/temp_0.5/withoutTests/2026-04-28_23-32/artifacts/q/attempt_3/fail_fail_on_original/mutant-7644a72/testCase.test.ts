import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create a QReturnValue instance', () => {
        if (typeof QReturnValue !== "undefined") {
            new QReturnValue('test');
        } else {
            expect(true).toBe(false);
        }
    });
});