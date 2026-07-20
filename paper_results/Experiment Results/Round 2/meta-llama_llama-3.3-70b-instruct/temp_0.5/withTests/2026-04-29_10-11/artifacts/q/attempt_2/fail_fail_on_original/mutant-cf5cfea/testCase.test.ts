import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('coerce function', () => {
    it('should reject the promise if an error occurs in the thenable', () => {
        var thenable = {
            then: function (fulfilled: any, rejected: any) {
                fulfilled('test');
            }
        };

        return Q(thenable).then((value: any) => {
            expect(value).toBe('test');
        }, (error: any) => {
            expect(true).toBe(false);
        });
    });
});