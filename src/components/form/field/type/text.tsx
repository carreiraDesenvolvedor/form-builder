import React, { FC, useEffect, useState } from "react";
import { FormFieldPropsTypeEnum, IFormField, IFormFieldProps } from "..";
import classNames from "classnames";

export type IFormFieldHandleOnChange = (
	fieldName: string,
	fieldValue: number | string
) => void;

export interface IFormFieldText extends IFormFieldProps {
	value: string | number;
	onChange: IFormFieldHandleOnChange;
	autoComplete: "on" | "off";
	type:
		| FormFieldPropsTypeEnum.Text
		| FormFieldPropsTypeEnum.Email
		| FormFieldPropsTypeEnum.Password;
	required: boolean;
}

const FormFieldText: FC<IFormField> = ({ field, handleFieldValidation }) => {
	const [isFirstRender, setIsFirstRender] = useState(true);

	useEffect(() => {
		if (isFirstRender) {
			validateField(field.name, field.value, false);
			setIsFirstRender(false);
		}
	}, [isFirstRender]);

	const validateField = (
		name: string,
		value: string | number,
		showMessage: boolean
	) => {
		let isValid = true;
		if (field.required) {
			if (value == "") {
				if (showMessage) setFieldError("This field is required!");
				isValid = false;
			}
		}

		if (isValid) {
			setFieldError("");
		}

		handleFieldValidation(name, isValid);
	};

	const [fieldError, setFieldError] = useState("");

	return (
		<div className="flex flex-col gap-2">
			<input
				id={field.name}
				name={field.name}
				className={classNames(
					{
						"border-danger": fieldError.length > 0,
					},
					"form-control py-3 px-4 block"
				)}
				type={field.type}
				placeholder={`${field.placeholder} ${
					field.required ? "*" : ""
				}`}
				onChange={(event) => {
					validateField(event.target.name, event.target.value, true);
					field.onChange(field.name, event.target.value);
				}}
				value={field.value}
				autoComplete={field.autoComplete}
			/>
			{fieldError.length > 0 && (
				<span className="text-danger">{fieldError}</span>
			)}
		</div>
	);
};

export default FormFieldText;
