"use server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_ID,
        secretAccessKey: process.env.AWS_SECRET_ID
    }
});

async function uploadFileToS3(file, fileName) {
    const fileBuffer = file;
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${fileName}`,
        Body: fileBuffer,
        ContentType: "mp4"
    }

    const command = new PutObjectCommand(params);
    try {
        const response = await s3Client.send(command);
        console.log("file Success", response);
        return fileName;
    } catch (error) {
        throw error;
    }
}

export async function uploadFile(prevState, formData) {
    try {
        const file = formData.get("file");

        if (!file || file.size === 0) {
            return { status: "error", message: "Please select a file" };
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        await uploadFileToS3(buffer, file.name);

        revalidatePath("/");
        return { status: "success", message: "File has been uploaded." };
    } catch (error) {
        return { status: "error", message: "File has not been uploaded." };
    }
}