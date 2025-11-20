/**
 * Converts a Mongoose lean document into a serializable plain JavaScript object.
 */

// ToDo: I don't like this as much
export function convertToSerializeableObject<W extends { _id: unknown }>(
  result: W
) {
  const { _id, ...rest } = result;
  const clone = { ...rest, _id: "" };

  if (
    !!result["_id"] &&
    "_id" in result &&
    typeof result["_id"] === "object" &&
    "toString" in result["_id"]
  ) {
    clone["_id"] = result._id.toString();
  }

  return clone;
}
