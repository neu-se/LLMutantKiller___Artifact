it('left is undefined', () => {
  expect(AttributeMap.transform(undefined, left, false)).toEqual(left);
});