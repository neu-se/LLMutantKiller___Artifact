import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should have a property that starts with double underscore on the error object', () => {
        const error = new Error();
        Q.makeStackTraceLong(error, Q.defer().promise);
        const keys = Object.keys(error);
        const hasDoubleUnderscoreKey = keys.some(key => key.startsWith('__'));
        expect(hasDoubleUnderscoreKey).toBe(true);
    });
});