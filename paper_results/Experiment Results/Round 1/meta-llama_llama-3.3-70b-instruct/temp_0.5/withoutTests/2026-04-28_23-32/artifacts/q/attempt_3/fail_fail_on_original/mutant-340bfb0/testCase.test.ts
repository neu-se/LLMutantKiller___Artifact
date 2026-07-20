import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should have a defined property __minimumStackCounter__ on the error object', () => {
        const error = new Error();
        const p = { stackCounter: 1 };
        const originalMakeStackTraceLong = Q.makeStackTraceLong;
        Q.makeStackTraceLong = function(error, promise) {
            originalMakeStackTraceLong(error, promise);
            expect(error.__minimumStackCounter__).toBeDefined();
        };
        const promise = Q.defer().promise;
        Q.makeStackTraceLong(new Error(), promise);
    });
});