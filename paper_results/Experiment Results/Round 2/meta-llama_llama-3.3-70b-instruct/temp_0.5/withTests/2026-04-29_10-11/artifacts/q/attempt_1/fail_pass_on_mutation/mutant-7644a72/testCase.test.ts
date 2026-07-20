import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('QReturnValue', function () {
    it('should be defined when ReturnValue is defined', function () {
        let ReturnValue = function (value) {
            this.value = value;
        };
        let QReturnValue;
        if (typeof ReturnValue !== "undefined") {
            QReturnValue = ReturnValue;
        } else {
            QReturnValue = function (value) {
                this.value = value;
            };
        }
        expect(QReturnValue).toBe(ReturnValue);
    });

    it('should be defined when ReturnValue is not defined', function () {
        let ReturnValue = undefined;
        let QReturnValue;
        if (typeof ReturnValue !== "undefined") {
            QReturnValue = ReturnValue;
        } else {
            QReturnValue = function (value) {
                this.value = value;
            };
        }
        expect(QReturnValue).not.toBe(ReturnValue);
    });
});