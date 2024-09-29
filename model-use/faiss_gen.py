from sentence_transformers import SentenceTransformer
from langchain.text_splitter import CharacterTextSplitter
import faiss, os, torch, tqdm
import numpy as np

# Load model and device
model_id = "dunzhang/stella_en_1.5B_v5"
device = "cuda:0" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")
torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32

def load_text_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            text = file.read()
        return text
    except FileNotFoundError:
        raise FileNotFoundError(f"The file {file_path} does not exist.")

def create_text_embeddings(text_list, model=model_id, device=device, torch_dtype=torch_dtype):
    model = SentenceTransformer(model, device=device, trust_remote_code=True)
    print(f"Loaded model: {model}")
    
    print(text_list)
    
    embeddings = model.encode(text_list, show_progress_bar=True)
    print(embeddings)
    
    return embeddings

def create_faiss_index(embeddings, index_path):
    
    print(type(embeddings))
    #Convert to numpy arrays
    if isinstance(embeddings, list):
        embeddings = np.array(embeddings).astype('float32').reshape(-1, 1024)
    elif isinstance(embeddings, np.ndarray):
            embeddings = embeddings.astype('float32').reshape(-1, 1024)
    
    #inner product similarity search
    index = faiss.IndexFlatL2(1024)   
    print(embeddings.shape)

    index.add(embeddings)

    # Save the index to disk
    faiss.write_index(index, index_path)

    return index

# Usage

data_path = "/home/pbatra6/sunhacks/text_data"

print(os.listdir(data_path))

text = load_text_file(os.path.join(data_path, "001 - 1. Introduction to Algorithms.txt"))
text_list = CharacterTextSplitter(chunk_size=100, chunk_overlap=30).split_text(text)

embedding_vectors = create_text_embeddings(text_list)
print(f"Created {len(embedding_vectors)} embedding vectors.")

faiss_index = create_faiss_index(embedding_vectors, "indices/test.index")
print(f"Embeddings stored in FAISS index with {faiss_index.ntotal} vectors.")
