import React from "react";
import LoadingSpinner from "./loading.spinner.component";

const PrimaryButtonComponent = ({
  isDisabled = false,
  type = "button",
  text = "Submit",
  isLoading = false,
  className = "",
  onClick = () => {},
}) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      type={type}
      className={`bg-purple text-sm font-semibold w-full px-4 py-3 border border-transparent hover:border hover:border-[#F0C3F1] rounded-xl shadow-sm ${className}`}
    >
      {isLoading ? <LoadingSpinner /> : text ? text : "Submit"}
    </button>
  );
};

export default PrimaryButtonComponent;
