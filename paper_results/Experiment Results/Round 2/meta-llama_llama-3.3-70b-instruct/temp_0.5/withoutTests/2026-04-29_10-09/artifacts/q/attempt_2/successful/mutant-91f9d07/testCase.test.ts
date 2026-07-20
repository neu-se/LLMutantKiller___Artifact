import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should denodeify a function correctly', () => {
        const callback = function(arg1: any, arg2: any, cb: any) {
            cb(null, arg1 + arg2);
        };

        const denodeifiedCallback = Q.denodeify(callback);
        const result = denodeifiedCallback(1, 2);

        return result.then((value: any) => {
            expect(value).toBe(3);
        });
    });
});