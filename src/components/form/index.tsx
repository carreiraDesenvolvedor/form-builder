import React, { FC, useEffect, useState } from "react";
import FormField from "./field";
import { IFormFieldText } from "./field/type/text";

type IFormValidFields = IFormFieldText;

interface IForm {
	fields: IFormValidFields[];
	addFormWrapperClass?: string;
	handleFormValidation: (isValid: boolean) => void;
}

const Form: FC<IForm> = ({
	fields,
	addFormWrapperClass,
	handleFormValidation,
}) => {
	const [fieldValidation, setFieldValidation] = useState<{
		[key: string]: boolean;
	}>({});

	useEffect(() => {
		if (!Object.keys(fieldValidation).length) {
			handleFormValidation(false);
			return;
		}

		handleFormValidation(
			Object.keys(fieldValidation).filter((key) => {
				return fieldValidation[key] === false;
			}).length === 0
		);
	}, [fieldValidation]);

	const handleFieldValidation = (key: string, isValid: boolean) => {
		setFieldValidation({
			...fieldValidation,
			[key]: isValid,
		});
	};

	return (
		<form autoComplete="off" className={`w-full ${addFormWrapperClass}`}>
			{fields.map((field, index) => (
				<FormField
					key={index}
					field={field}
					handleFieldValidation={handleFieldValidation}
				/>
			))}
		</form>
	);
};

export { Form };

export type { IFormValidFields };
