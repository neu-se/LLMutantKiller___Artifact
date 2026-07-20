import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should test the promised function', () => {
        var callback = Q.promised(function (a, b) {
            return a + b;
        });
        return callback(Q(1), Q(2)).then(function (result) {
            expect(result).toBe(3);
        });
    });
});