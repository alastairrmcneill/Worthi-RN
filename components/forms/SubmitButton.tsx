import React from "react";
import { useFormikContext } from "formik";
import PrimaryButton from "@/components/PrimaryButton";

interface SubmitButtonProps {
  title: string;
}

export default function SubmitButton({ title }: SubmitButtonProps) {
  const { handleSubmit } = useFormikContext();
  return <PrimaryButton title={title} onPress={handleSubmit} />;
}
