import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('coerce function', () => {
    it('should reject the promise if an error occurs in the thenable', () => {
        var thenable = {
            then: function (fulfilled: any, rejected: any) {
                try {
                    throw new Error('test');
                } catch (e) {
                    // do nothing
                }
            }
        };

        return Q(thenable).then((value: any) => {
            expect(true).toBe(true);
        }, (error: any) => {
            expect(true).toBe(false);
        });
    });
});