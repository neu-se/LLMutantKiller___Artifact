import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', function () {
    it('should return a promise that resolves to the correct value when ReturnValue is defined', function () {
        let ReturnValue = function (value) {
            this.value = value;
        };
        let q = Q(function () {
            return new ReturnValue(10);
        });
        expect(q.then(function (value) {
            return value;
        })).resolves.toHaveProperty('value', 10);
    });
});