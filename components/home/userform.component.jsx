"use client";
import React from "react";
import { useForm } from "react-hook-form";
import TextInputComponent from "../inputs/textinputcomponent";
import PrimaryButtonComponent from "../inputs/primary-btn.component";
import { updatePrice } from "@/utils/admin-apis";
import ChartComponent from "./chart.component";

const UserFormComponent = ({ defaultData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    watch,
    formState: { errors, touchedFields },
  } = useForm();

  const name = getValues("name");
  const location = getValues("location");
  const charge_customers = watch("charge_customers");
  let category_6 = parseInt(watch("amount.category_6"));
  let category_7 = parseInt(watch("amount.category_7"));
  let category_8 = parseInt(watch("amount.category_8"));
  let category_9 = parseInt(watch("amount.category_9"));
  let category_10 = parseInt(watch("amount.category_10"));
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitEnabled, SetisSubmitEnabled] = React.useState(true);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try{
        // console.log(touchedFields)
        const touchedFieldsArray = Object.keys(touchedFields?.amount);
        if (touchedFieldsArray?.length > 0) {
          // Create a new object with only the touched fields
          const postData = touchedFieldsArray.reduce((acc, field) => {
            acc[field] = data.amount[field];
            return acc;
          }, {});

          const res = await updatePrice({amount: postData});
          if(res?.status === 200){
            console.log("Price Updated !");
            reset({
              name: data?.name,
              location: data?.location,
              charge_customers: data?.charge_customers,
              amount: data?.amount,
            });
          }
        }
    }
    catch(error){
        console.log(error);
    }
    
    setIsLoading(false);
  };

  React.useEffect(() => {
    if (defaultData) {
      reset({
        name: defaultData?.name,
        location: defaultData?.location,
        charge_customers: defaultData?.charge_customers,
        amount: defaultData?.amount,
      });
    }
  }, [defaultData]);

  return (
    <div className="flex flex-col py-10 space-y-10">
      <div className="space-y-10">
        <h1 className="text-2xl font-semibold text-center">
          {name}, {location} on Dhun Jam
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-8 text-sm"
        >
          <div className="grid grid-cols-2 items-stretch justify-center gap-14 content-stretch">
            <h1 className="flex items-center">
              Do you want to charge your customers for requesting songs ?
            </h1>
            <div className="flex items-center gap-8 justify-center">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="charge_customers"
                  value={true}
                  onChange={(e) =>{
                    setValue(
                      "charge_customers",
                      e.target.value.toLowerCase() === "true"
                    ); SetisSubmitEnabled(true)}
                  }
                  className="checked:bg-purple"
                  checked={charge_customers === true}
                />
                <label htmlFor="">Yes</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="charge_customers"
                  value={false}
                  onChange={(e) =>{
                    setValue(
                      "charge_customers",
                      e.target.value.toLowerCase() === "true"
                    ); SetisSubmitEnabled(false)}
                  }
                  className="checked:bg-purple"
                  checked={charge_customers === false}
                />
                <label htmlFor="">No</label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 items-stretch justify-center gap-14 content-stretch">
            <h1 className="flex items-center">Custom song request amount - </h1>
            <TextInputComponent
              name="amount.category_6"
              register={register}
              errors={errors}
              className="text-center py-2"
              disabled={!watch("charge_customers")}
              
            />
          </div>
          <div className="grid grid-cols-2 items-stretch justify-center gap-14 content-stretch">
            <h1 className="flex items-center">
              Regular song request amounts, from high to low -{" "}
            </h1>
            <div className="grid grid-cols-4 gap-5">
              <TextInputComponent
                type={"number"}
                name="amount.category_7"
                register={register}
                errors={errors}
                disabled={!watch("charge_customers")}
              />
              <TextInputComponent
                type={"number"}
                name="amount.category_8"
                register={register}
                errors={errors}
                disabled={!watch("charge_customers")}
              />
              <TextInputComponent
                type={"number"}
                name="amount.category_9"
                register={register}
                errors={errors}
                disabled={!watch("charge_customers")}
              />
              <TextInputComponent
                type={"number"}
                name="amount.category_10"
                register={register}
                errors={errors}
                disabled={!watch("charge_customers")}
              />
            </div>
          </div>
          
       {charge_customers && <ChartComponent watch={watch}/>}
          <PrimaryButtonComponent
            type="submit"
            isDisabled={
              !(
                isSubmitEnabled &&
                category_6 >= 99 &&
                category_6 > category_7 &&
                category_7 > category_8 &&
                category_8 > category_9 &&
                category_9 > category_10
              )
            }
            isLoading={isLoading}
            className="disabled:border disabled:border-grey disabled:text-grey disabled:bg-transparent"
          />
        </form>
      </div>
    </div>
  );
};

export default UserFormComponent;
