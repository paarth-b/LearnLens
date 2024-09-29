import os
import torch
from tqdm import tqdm
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline

# Define the model and device
model_id = "distil-whisper/distil-large-v3"
device = "cuda:0" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")
torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32

# Load the model and processor
model = AutoModelForSpeechSeq2Seq.from_pretrained(model_id, torch_dtype=torch_dtype, use_safetensors=True)
model.to(device)
processor = AutoProcessor.from_pretrained(model_id)

# Create a pipeline for automatic speech recognition
pipe = pipeline(
    "automatic-speech-recognition",
    model=model,
    tokenizer=processor.tokenizer,
    feature_extractor=processor.feature_extractor,
    max_new_tokens=128,
    torch_dtype=torch_dtype,
    device=device,
)

# Define the directory containing audio files
directory_path = "/home/pbatra6/sunhacks/audio_data/mp3convert"
# Get list of audio files
audio_files = [f for f in os.listdir(directory_path) if f.endswith((".m4a", ".mp3"))]

# Loop through each audio file in the directory with tqdm progress bar
for filename in tqdm(audio_files, desc="Processing audio files", unit="file"):
    if filename.endswith(".m4a") or filename.endswith(".mp3"):  # Assuming M4A or MP3 files
        file_path = os.path.join(directory_path, filename)
        
        # Transcribe the audio file using the pipeline
        result = pipe(file_path)
        
        # Print the transcription
        print(f"Transcription for {filename}: {result['text']}")
        
        # Save the transcription to a text file
        output_filename = filename.replace(".m4a", ".txt") if filename.endswith(".m4a") else filename.replace(".mp3", ".txt")
        output_file_path = os.path.join(directory_path, output_filename)
        with open(output_file_path, "w") as file:
            file.write(result["text"])
        
        print(f"Transcription saved to {output_file_path}")
