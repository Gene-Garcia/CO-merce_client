import React, { useState, useEffect } from "react";
import useAlert from "../../../../../../../hooks/useAlert";
import InputField from "../../../../../../../shared/Auth/InputField";
import validateUser from "../../../../../../../shared/Auth/Validation";
import axios from "../../../../../../../shared/caller";
import Title from "../../../../../../../shared/Components/pages/Title";
import { useForm } from "../../../../../../../shared/Form/useForm";
import Loading from "../../../../../../../shared/Loading/Loading";

function ChangePassword({ history }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    validateUser((status) => {
      if (status === "SUCCESS") setLoading(false);
      else if (status === "FAILED") history.push("/login");
      else if (status === "UNAUTHORIZED") history.push("/unauthorized");
      else if (status === "FORBIDDEN") history.push("/forbidden");
    });
  }, []);

  async function ChangePasswordAPI() {
    await axios
      .post("/api/user/password/change", values)
      .then((res) => {
        resetForms();

        if (res.status === 200) {
          setSeverity("success");
          setMessage("Successfully changed password");
        } else setMessage(res.data.message);
      })
      .catch((err) => {
        setSeverity("error");

        if (err.response === undefined)
          setMessage("Something went wrong. Try again.");
        else if (err.response.status === 401) history.push("/sign-in");
        else if (err.response.status === 403) history.push("/forbidden");
        else setMessage(err.response.data.error);
      });
  }

  function validate(formData, setErrors) {
    const tempErrs = { ...errors };

    if ("oldPassword" in formData)
      tempErrs.oldPassword =
        formData.oldPassword === "" || formData.oldPassword === null
          ? "This password is required"
          : "";

    if ("newPassword" in formData)
      tempErrs.newPassword =
        formData.newPassword === "" || formData.newPassword === null
          ? "This password is required"
          : "";

    setErrors(tempErrs);
  }

  const initialState = { oldPassword: "", newPassword: "" };
  const { values, errors, handleInput, resetForms, handleFormSubmit } = useForm(
    initialState,
    initialState,
    validate,
    ChangePasswordAPI
  );

  const { setMessage, setSeverity } = useAlert();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="">
          <Title title="My Account" />

          <div className="w-4/5 mx-auto mt-10">
            <h1 className="text-gray-800 text-2xl font-semibold">
              Change Password
            </h1>

            <div className="mt-8 w-3/5 space-y-8">
              <InputField
                label="Old Password"
                type="password"
                name="oldPassword"
                value={values.oldPassword}
                error={errors.oldPassword}
                onChange={handleInput}
              />

              <InputField
                label="New Password"
                type="password"
                name="newPassword"
                value={values.newPassword}
                error={errors.newPassword}
                onChange={handleInput}
              />

              <button
                onClick={handleFormSubmit}
                className="transition bg-my-accent text-my-contrast font-semibold rounded-md px-4 py-1.5 border border-transparent hover:bg-my-accent-mono active:ring active:ring-my-accent-mono active:ring-offset-2 active:ring-opacity-80"
              >
                Save New Password
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default ChangePassword;
