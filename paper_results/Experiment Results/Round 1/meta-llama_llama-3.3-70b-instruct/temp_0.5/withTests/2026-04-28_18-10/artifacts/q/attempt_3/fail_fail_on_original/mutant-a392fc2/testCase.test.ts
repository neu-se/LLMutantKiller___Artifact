import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise.prototype.finally', function () {
    it('should throw an error', function () {
        expect(function () {
            Q().finally("not a function");
        }).toThrowError("Q can't apply finally callback");
    });
});