import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should denodeify a function correctly', () => {
        const callback = function(arg1, arg2, cb) {
            cb(null, arg1 + arg2);
        };

        const denodeifiedCallback = Q.denodeify(callback);
        const result = denodeifiedCallback(1, 2);

        return result.then((value) => {
            expect(value).toBe(3);
        });
    });
});