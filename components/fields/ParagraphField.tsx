"use client";

import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../ui/form"
import { LuHeading1 } from "react-icons/lu";
import { BsTextParagraph } from "react-icons/bs";

const type: ElementsType = "ParagraphField";

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

const extraAttributes = {
    text: "Text here"
}

const propertiesSchema = z.object({
    text: z.string().min(2).max(500),
})

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
const PropertiesComponent = ({
    elementInstance
}: {
    elementInstance: FormElementInstance
}) => {
    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner();
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            text: element.extraAttributes.text,
        }
    })

    useEffect(() => {
        form.reset(element.extraAttributes)
    }, [element, form]);

    const applyChanges = (values: propertiesFormSchemaType) => {
        const { text } = values;

        updateElement(element.id, {
            ...element,
            extraAttributes: {
                text
            }
        })
    }

    return (
        <Form {...form}>
            <form
                onBlur={form.handleSubmit(applyChanges)}
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                className="space-y-3"
            >
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Text</FormLabel>
                            <FormControl>
                                <Input {...field} onKeyDown={(e) => {
                                    if (e.key === "Enter") e.currentTarget.blur();
                                }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

const DesignerComponent = ({ elementInstance }: { elementInstance: FormElementInstance }) => {

    const element = elementInstance as CustomInstance;

    const { text } = element.extraAttributes

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-muted-foreground">
                Paragraph field
            </Label>
            <p >
                {text}
            </p>
        </div>
    )
}
const FormComponent = ({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
}) => {

    const element = elementInstance as CustomInstance;

    const { text } = element.extraAttributes

    return (
        <p>
            {text}
        </p>
    )
}

export const ParagraphFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: BsTextParagraph,
        label: "Paragraph Field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true
}
