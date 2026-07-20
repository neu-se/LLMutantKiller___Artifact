import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', function () {
    it('should return a promise that resolves to the correct value', function () {
        let q = Q(10);
        expect(q.then(function (value) {
            return value;
        })).resolves.toBe(10);
    });
});