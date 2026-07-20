import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should not throw an error when creating a promise', () => {
        var error;
        try {
            q();
        } catch (e) {
            error = e;
        }
        expect(error).toBeUndefined();
    });
});