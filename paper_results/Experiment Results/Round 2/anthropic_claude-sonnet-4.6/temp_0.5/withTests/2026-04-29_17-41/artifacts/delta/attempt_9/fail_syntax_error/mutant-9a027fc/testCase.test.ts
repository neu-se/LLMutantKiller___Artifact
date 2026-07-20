retain(length: number | Record<string, unknown>, attributes?: ...): this {
  if (typeof length === 'number' && length <= 0) { return this; }
  const newOp: Op = { retain: length };
  ...
  return this.push(newOp);
}