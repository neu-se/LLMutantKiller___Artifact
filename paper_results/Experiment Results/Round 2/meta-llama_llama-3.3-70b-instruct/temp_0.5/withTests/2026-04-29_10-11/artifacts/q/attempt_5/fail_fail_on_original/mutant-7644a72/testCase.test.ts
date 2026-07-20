import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', function () {
    it('should throw an error when trying to access QReturnValue if ReturnValue is not defined and the condition is false', function () {
        let originalReturnValue = global.ReturnValue;
        global.ReturnValue = undefined;
        let q = Q(function () {});
        if (false) {
            expect(q.QReturnValue).toBe(global.ReturnValue);
        } else {
            expect(q.QReturnValue).not.toBe(global.ReturnValue);
        }
        global.ReturnValue = originalReturnValue;
    });
});