import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', function () {
    it('should return a promise that resolves to the correct value when ReturnValue is defined, and rejects with the correct error when ReturnValue is not defined and the condition is false', function () {
        let ReturnValue = function (value) {
            this.value = value;
        };
        let q1 = Q(function () {
            return new ReturnValue(10);
        });
        let q2 = Q(function () {
            throw new Error('Test error');
        });
        expect(q1.then(function (value) {
            return value;
        })).resolves.toHaveProperty('value', 10);
        expect(q2.catch(function (error) {
            return error;
        })).rejects.toThrowError('Test error');
        let q3 = Q(function () {
            return Q.return(10);
        });
        expect(q3.then(function (value) {
            return value;
        })).resolves.toBe(10);
        let q4 = Q(function () {
            return Q.return(new ReturnValue(10));
        });
        expect(q4.then(function (value) {
            return value;
        })).resolves.toHaveProperty('value', 10);
        let q5 = Q(function () {
            return Q.return(new ReturnValue(10));
        });
        expect(q5.then(function (value) {
            return value;
        })).resolves.toHaveProperty('value', 10);
        let q6 = Q(function () {
            return new ReturnValue(10);
        });
        expect(q6.then(function (value) {
            return value;
        })).resolves.toHaveProperty('value', 10);
    });
});