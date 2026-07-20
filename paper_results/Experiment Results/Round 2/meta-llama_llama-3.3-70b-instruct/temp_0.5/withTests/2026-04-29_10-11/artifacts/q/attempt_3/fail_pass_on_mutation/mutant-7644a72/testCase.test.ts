import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', function () {
    it('should define QReturnValue when ReturnValue is defined', function () {
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
        expect(QReturnValue).toBeDefined();
    });
});