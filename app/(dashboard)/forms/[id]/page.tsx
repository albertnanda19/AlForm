import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/FormBuilder";

const Builder = async ({ params }: { params: { id: string } }) => {

    const { id } = params;
    const form = await GetFormById(Number(id));
    if (!form) {
        throw new Error("Form not found!")
    }
    return (
        <>
            Details
        </>
    );
}

export default Builder;