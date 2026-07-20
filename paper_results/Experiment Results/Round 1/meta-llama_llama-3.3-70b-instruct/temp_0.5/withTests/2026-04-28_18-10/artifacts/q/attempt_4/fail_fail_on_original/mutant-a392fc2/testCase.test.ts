import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise.prototype.finally', function () {
    it('should not throw an error', function () {
        expect(function () {
            Q().finally(function () {});
        }).not.toThrowError();
    });
});