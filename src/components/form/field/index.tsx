import React, { FC, ReactElement } from "react";
import FormFieldText, { IFormFieldText } from "./type/text";

export enum FormFieldPropsTypeEnum {
	Text = "text",
	Password = "password",
	Email = "email",
	File = "file",
}

export interface IFormFieldProps {
	name: string;
	label?: string;
	placeholder?: string;
	required: boolean;
}

export type IFormFieldHandleOnChange = (
	fieldName: string,
	fieldValue: number | string | File[]
) => void;

export interface IFormField {
	field: IFormFieldText;
	handleFieldValidation: (key: string, isValid: boolean) => void;
}

const FormField: FC<IFormField> = ({ field, handleFieldValidation }) => {
	const { label, name } = field;
	return (
		<div className="mt-4">
			{label && (
				<label
					htmlFor={name}
					className="font-semibold text-gray-600 block pb-1"
				>
					{label}
				</label>
			)}
			<>
				{buildFieldElement({
					field,
					handleFieldValidation,
				})}
			</>
		</div>
	);
};

const buildFieldElement = ({
	field,
	handleFieldValidation,
}: IFormField): ReactElement => {
	switch (field.type) {
		case FormFieldPropsTypeEnum.Text:
		case FormFieldPropsTypeEnum.Email:
		case FormFieldPropsTypeEnum.Password:
			return (
				<FormFieldText
					field={field}
					handleFieldValidation={handleFieldValidation}
				/>
			);
		// case FormFieldPropsTypeEnum.File:
		//     return (
		//         <FormFieldFile
		//             handleOnChange={handleOnChange}
		//             field={field}
		//             value={value}
		//         />
		//     );
	}
	return <></>;
};

export default FormField;
