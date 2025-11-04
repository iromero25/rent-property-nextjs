"use server";

// import * as z from "zod";
import { IProperty } from "@/types";
import Property from "@/models/Property";
import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { propertyFormSchema } from "@/schemas";

// type DeepValue<T, P extends string> = P extends `${infer Head}.${infer Tail}`
//   ? Head extends keyof T
//     ? DeepValue<T[Head], Tail>
//     : never
//   : P extends keyof T
//   ? T[P]
//   : never;

// type LocationStreetType = DeepValue<IProperty, "does.not.exist">;

function getFormValue<K extends keyof IProperty>(
  formData: FormData,
  key: K
): IProperty[K] {
  const value = formData.getAll(key);
  // return single or array depending on field
  if (Array.isArray(value) && value.length > 1) return value as IProperty[K];
  return formData.get(key) as IProperty[K];
}

// function getFormValue<P extends string>(
//   formData: FormData,
//   key: P
// ): DeepValue<IProperty, P> {
//   return formData.get(key) as DeepValue<IProperty, P>;
// }

const addProperty = async (formData: FormData) => {
  // const strictPropertySchema = propertyFormSchema.strict();
  // const validatedFields = strictPropertySchema.safeParse({
  //   email: formData.get("email"),
  //   amenities: formData.get("amenities"),
  //   ameni: formData.get("ameties"),
  // });

  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const amenities = getFormValue(formData, "amenities");
  const images = getFormValue(formData, "images").filter(
    (image) => image.name !== ""
  );

  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities,
    rates: {
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
      nightly: formData.get("rates.nightly."),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
    images,
  };

  // const propertyData = {
  //   owner: userId,
  //   type: getFormValue(formData, "type"),
  //   name: getFormValue(formData, "name"),
  //   description: getFormValue(formData, "description"),
  //   location: {
  //     street,
  //     city,
  //     state,
  //     zipcode,
  //   },
  //   beds: getFormValue(formData, "beds"),
  //   baths: getFormValue(formData, "baths"),
  //   square_feet: getFormValue(formData, "square_feet"),
  //   amenities,
  //   rates: {
  //     weekly,
  //     monthly,
  //     nightly,
  //   },
  //   seller_info: {
  //     name: seller_name,
  //     email: seller_email,
  //     phone: seller_phone,
  //   },
  //   // owner: userId,
  // };

  // console.log("propertyData", propertyData);

  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath("/", "layout");

  redirect(`/properties/${newProperty._id}`);
};

export default addProperty;
