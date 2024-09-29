import torch, os
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

text_dir_path = "/home/pbatra6/sunhacks/text_data"

file_path = "/home/pbatra6/sunhacks/audio_data/mp3convert/001 - 1. Introduction to Algorithms.mp3"

if file_path.endswith(".mp3"):
    # Process a single MP3 file
    result = pipe(file_path)
    
    # Print the transcription
    print(result['text'])
    
    # Save the transcription to a text file
    output_file_path = file_path.replace(".mp3", ".txt")
    output_file_path = os.path.join(text_dir_path, os.path.basename(output_file_path))
    with open(output_file_path, "w") as file:
        file.write(result["text"])
    
    print(f"Transcription saved to {output_file_path}")