import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('coerce function', () => {
    it('should reject the promise if an error occurs in the thenable', () => {
        var thenable = {
            then: function (fulfilled: any, rejected: any) {
                rejected('test');
            }
        };

        return Q(thenable).then((value: any) => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error).toBe('test');
        });
    });
});