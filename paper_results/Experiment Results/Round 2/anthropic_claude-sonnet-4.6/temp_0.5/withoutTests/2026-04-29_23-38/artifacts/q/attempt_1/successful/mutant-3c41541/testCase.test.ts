import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.del / Q.delete dispatch", () => {
  it("should dispatch 'delete' operation to delete a property from an object", async () => {
    const obj = { foo: 42, bar: "hello" };
    
    // Q.delete should dispatch "delete" operation which deletes the property
    await Q.delete(obj, "foo");
    
    // If the mutation is present, dispatch("", [key]) is called instead of dispatch("delete", [key])
    // The "delete" operation on a fulfilled promise removes the property from the object
    // With the mutation, "" operation would be dispatched, which falls through to the fallback
    // and returns a rejected promise (since "" is not a valid operation)
    
    // Verify the property was actually deleted
    expect(obj.hasOwnProperty("foo")).toBe(false);
    expect(obj.bar).toBe("hello");
  });
});