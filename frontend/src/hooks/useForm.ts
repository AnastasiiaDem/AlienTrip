import { useState } from "react";

interface IErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

const useForm = () => {
  const [errors, setErrors] = useState<IErrors>({});

  const handleChange = (name: string, value: string) => {
    validate(name, value);
  };

  const validate = (name: string, value: string) => {
    const REG_NAME = /^[a-zA-Z\-\']+$/;
    const REG_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const REG_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    switch (name) {
      case "firstName":
        if (!REG_NAME.test(value)) setErrors({ ...errors, firstName: "The first name should be real and correct" });
        else {
          delete errors["firstName"];
        }
        break;

      case "lastName":
        if (!REG_NAME.test(value)) setErrors({ ...errors, lastName: "The last name should be real and correct" });
        else {
          delete errors["lastName"];
        }
        break;

      case "email":
        if (!REG_EMAIL.test(value)) setErrors({ ...errors, email: "An email should be correct" });
        else {
          delete errors["email"];
        }
        break;

      case "password":
        if (!REG_PASSWORD.test(value))
          setErrors({
            ...errors,
            password:
              "A password should contains at least 8 characters: at least 1 number, 1 uppercase and 1 lowercase. Should contains only digits and letters",
          });
        else {
          delete errors["password"];
        }
        break;

      default:
        break;
    }
  };

  return {
    errors,
    handleChange,
  };
};

export default useForm;
