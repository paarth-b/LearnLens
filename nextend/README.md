# Main next/react web app files

Next.js files handle web app logic and interactions with AWS S3 bucket

# Web app goals

Users interact with custom designed React components to upload MP4 files. Next.js logic moves the MP4 file objects to the AWS S3 bucket for Python LLM/RAG models to create live video transcription and generate chats/quizzes corresponding to the input video. 

React renders a new page component displaying the MP4 with a responsive quiz section and chatbot, where users can ask the AI chatbot about the video content as well as interact with the quiz – designed by the RAG model to create questions related to the MP4 content.
