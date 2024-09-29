import { uploadFile } from "./actions";
import { useFormState } from "react-dom";
import { useRouter } from 'next/navigation';
import { FileInput } from './FileInput';

const initialState = { message: null };

export function UploadForm() {
    const router = useRouter();
    const [state, formAction] = useFormState(uploadFile, initialState);

    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        
        const result = await uploadFile(null, formData);
        
        if (result.status === 'success') {
            router.push('/video');
        }
    };

    return (
        <div className="form-wrapper">
            <FileInput onFileUpload={handleFileUpload} />
            {state?.status && (
                <div className={`state-message ${state?.status}`}>
                    {state?.message}
                </div>
            )}
        </div>
    );
}