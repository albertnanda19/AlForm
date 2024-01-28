"use client";

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
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../ui/form"
import { LuHeading1 } from "react-icons/lu";

const type: ElementsType = "TitleField";

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

const extraAttributes = {
    title: "Title field",
}

const propertiesSchema = z.object({
    title: z.string().min(2).max(50),
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
            title: element.extraAttributes.title,
        }
    })

    useEffect(() => {
        form.reset(element.extraAttributes)
    }, [element, form]);

    const applyChanges = (values: propertiesFormSchemaType) => {
        const { title } = values;

        updateElement(element.id, {
            ...element,
            extraAttributes: {
                title
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
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
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

    const { title } = element.extraAttributes

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-muted-foreground">
                Title field
            </Label>
            <p className="text-xl">
                {title}
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

    const { title } = element.extraAttributes

    return (
        <p className="text-xl">
            {title}
        </p>
    )
}

export const TitleFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: LuHeading1,
        label: "Title Field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true
}
